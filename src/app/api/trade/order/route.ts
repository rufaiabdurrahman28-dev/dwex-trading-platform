import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, symbol, side, type, amount, price, leverage } = body

    if (!userId || !symbol || !side || !type || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!['buy', 'sell'].includes(side)) {
      return NextResponse.json({ error: 'Side must be buy or sell' }, { status: 400 })
    }

    if (!['market', 'limit'].includes(type)) {
      return NextResponse.json({ error: 'Type must be market or limit' }, { status: 400 })
    }

    if (amount <= 0) {
      return NextResponse.json({ error: 'Amount must be positive' }, { status: 400 })
    }

    if (type === 'limit' && !price) {
      return NextResponse.json({ error: 'Limit price is required for limit orders' }, { status: 400 })
    }

    // Mock order creation
    const order = {
      id: `ORD-${Date.now()}`,
      userId,
      symbol,
      side,
      type,
      amount,
      price: price || null,
      leverage: leverage || 1,
      status: type === 'market' ? 'filled' : 'pending',
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      order,
      message: type === 'market'
        ? `${side === 'buy' ? 'Buy' : 'Sell'} order filled successfully`
        : 'Limit order placed successfully',
    }, { status: 201 })
  } catch (error) {
    console.error('Order error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
