import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/api/auth'
import { success, error, unauthorized, notFound } from '@/lib/api/response'

const VALID_CURRENCIES = ['NGN', 'USD', 'BTC', 'ETH', 'USDT']

export async function POST(request: Request) {
  const user = await getAuthUser()
  if (!user) return unauthorized()

  try {
    const body = await request.json()
    const { recipientEmail, amount, currency } = body

    // Validate recipient email
    if (!recipientEmail) {
      return error('Recipient email is required')
    }

    // Validate amount
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return error('Amount must be a positive number')
    }

    // Validate currency
    const normalizedCurrency = currency?.toUpperCase()
    if (!normalizedCurrency || !VALID_CURRENCIES.includes(normalizedCurrency)) {
      return error(`Invalid currency. Must be one of: ${VALID_CURRENCIES.join(', ')}`)
    }

    // Cannot transfer to self
    if (recipientEmail.toLowerCase() === user.email.toLowerCase()) {
      return error('Cannot transfer to your own account')
    }

    // Find recipient
    const recipient = await db.user.findUnique({
      where: { email: recipientEmail.toLowerCase() },
    })

    if (!recipient) {
      return notFound('Recipient not found')
    }

    if (recipient.accountStatus === 'banned' || recipient.accountStatus === 'suspended') {
      return error('Recipient account is not active')
    }

    // Find sender's wallet
    const senderWallet = await db.wallet.findUnique({
      where: {
        userId_currency: {
          userId: user.id,
          currency: normalizedCurrency,
        },
      },
    })

    if (!senderWallet) {
      return notFound(`No ${normalizedCurrency} wallet found`)
    }

    // Check sufficient balance
    const availableBalance = senderWallet.balance - senderWallet.locked
    if (availableBalance < amount) {
      return error(
        `Insufficient balance. Available: ${availableBalance} ${normalizedCurrency}, Requested: ${amount} ${normalizedCurrency}`
      )
    }

    // Find or create recipient's wallet
    let recipientWallet = await db.wallet.findUnique({
      where: {
        userId_currency: {
          userId: recipient.id,
          currency: normalizedCurrency,
        },
      },
    })

    if (!recipientWallet) {
      recipientWallet = await db.wallet.create({
        data: {
          userId: recipient.id,
          currency: normalizedCurrency,
          balance: 0,
          locked: 0,
        },
      })
    }

    // Create transfer_out transaction for sender
    const transferOut = await db.transaction.create({
      data: {
        userId: user.id,
        type: 'transfer_out',
        amount,
        currency: normalizedCurrency,
        status: 'completed',
        method: 'internal',
        description: `Transfer to ${recipient.email}`,
        metadata: JSON.stringify({
          recipientId: recipient.id,
          recipientEmail: recipient.email,
          senderWalletId: senderWallet.id,
        }),
      },
    })

    // Create transfer_in transaction for recipient
    const transferIn = await db.transaction.create({
      data: {
        userId: recipient.id,
        type: 'transfer_in',
        amount,
        currency: normalizedCurrency,
        status: 'completed',
        method: 'internal',
        description: `Transfer from ${user.email}`,
        metadata: JSON.stringify({
          senderId: user.id,
          senderEmail: user.email,
          recipientWalletId: recipientWallet.id,
        }),
      },
    })

    // Update both wallets
    const [updatedSenderWallet, updatedRecipientWallet] = await Promise.all([
      db.wallet.update({
        where: { id: senderWallet.id },
        data: { balance: { decrement: amount } },
      }),
      db.wallet.update({
        where: { id: recipientWallet.id },
        data: { balance: { increment: amount } },
      }),
    ])

    return success({
      transaction: transferOut,
      senderWallet: updatedSenderWallet,
      recipientWallet: updatedRecipientWallet,
    })
  } catch (err) {
    console.error('Wallet transfer error:', err)
    return error('Failed to process transfer', 500)
  }
}
