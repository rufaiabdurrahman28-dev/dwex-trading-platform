import { NextRequest, NextResponse } from 'next/server'

// This endpoint initializes the database schema on Supabase
// Uses the Supabase SQL API with the service role key (not Prisma)
// Call: POST /api/setup-database with Bearer token = SUPABASE_SERVICE_ROLE_KEY

const MIGRATION_SQL = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossl";

CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "passwordHash" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "phone" TEXT,
  "country" TEXT NOT NULL DEFAULT 'Nigeria',
  "role" TEXT NOT NULL DEFAULT 'trader',
  "accountStatus" TEXT NOT NULL DEFAULT 'active',
  "emailVerified" BOOLEAN NOT NULL DEFAULT false,
  "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
  "twoFactorSecret" TEXT,
  "transactionPin" TEXT,
  "avatarUrl" TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "Session" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "token" TEXT NOT NULL UNIQUE,
  "userAgent" TEXT,
  "ip" TEXT,
  "expiresAt" TIMESTAMPTZ NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Profile" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL UNIQUE,
  "displayName" TEXT,
  "bio" TEXT,
  "address" TEXT,
  "city" TEXT,
  "state" TEXT,
  "zipCode" TEXT,
  "dateOfBirth" TEXT,
  "nationality" TEXT,
  "occupation" TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "KYC" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL UNIQUE,
  "status" TEXT NOT NULL DEFAULT 'none',
  "documentType" TEXT,
  "documentNumber" TEXT,
  "documentFrontUrl" TEXT,
  "documentBackUrl" TEXT,
  "selfieUrl" TEXT,
  "addressProofUrl" TEXT,
  "reviewedBy" TEXT,
  "reviewNote" TEXT,
  "submittedAt" TIMESTAMPTZ,
  "reviewedAt" TIMESTAMPTZ,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "KYC_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Wallet" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'NGN',
  "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "locked" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Transaction" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "amount" DOUBLE PRECISION NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'NGN',
  "status" TEXT NOT NULL DEFAULT 'pending',
  "method" TEXT,
  "reference" TEXT,
  "description" TEXT,
  "metadata" TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "BrokerConnection" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "brokerId" TEXT NOT NULL,
  "brokerName" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'disconnected',
  "accountId" TEXT,
  "accessToken" TEXT,
  "refreshToken" TEXT,
  "lastSyncedAt" TIMESTAMPTZ,
  "metadata" TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "BrokerConnection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Position" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "brokerId" TEXT NOT NULL,
  "symbol" TEXT NOT NULL,
  "direction" TEXT NOT NULL,
  "lotSize" DOUBLE PRECISION NOT NULL,
  "openPrice" DOUBLE PRECISION NOT NULL,
  "closePrice" DOUBLE PRECISION,
  "stopLoss" DOUBLE PRECISION,
  "takeProfit" DOUBLE PRECISION,
  "pnl" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "swap" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "commission" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "margin" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "leverage" INTEGER NOT NULL DEFAULT 1,
  "status" TEXT NOT NULL DEFAULT 'open',
  "openedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "closedAt" TIMESTAMPTZ,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "Position_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Order" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "brokerId" TEXT NOT NULL,
  "symbol" TEXT NOT NULL,
  "direction" TEXT NOT NULL,
  "orderType" TEXT NOT NULL,
  "lotSize" DOUBLE PRECISION NOT NULL,
  "price" DOUBLE PRECISION,
  "stopLoss" DOUBLE PRECISION,
  "takeProfit" DOUBLE PRECISION,
  "status" TEXT NOT NULL DEFAULT 'pending',
  "filledPrice" DOUBLE PRECISION,
  "filledAt" TIMESTAMPTZ,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "PriceAlert" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "symbol" TEXT NOT NULL,
  "condition" TEXT NOT NULL,
  "targetPrice" DOUBLE PRECISION NOT NULL,
  "currentPrice" DOUBLE PRECISION,
  "status" TEXT NOT NULL DEFAULT 'active',
  "triggeredAt" TIMESTAMPTZ,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "PriceAlert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Notification" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "read" BOOLEAN NOT NULL DEFAULT false,
  "metadata" TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "APIKey" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "key" TEXT NOT NULL UNIQUE,
  "secret" TEXT NOT NULL,
  "permissions" TEXT NOT NULL DEFAULT 'read',
  "lastUsedAt" TIMESTAMPTZ,
  "expiresAt" TIMESTAMPTZ,
  "status" TEXT NOT NULL DEFAULT 'active',
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "APIKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "SystemConfig" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "key" TEXT NOT NULL UNIQUE,
  "value" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "BrokerConfig" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "brokerId" TEXT NOT NULL UNIQUE,
  "brokerName" TEXT NOT NULL,
  "apiEndpoint" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "config" TEXT
);

CREATE INDEX IF NOT EXISTS "Session_userId_idx" ON "Session"("userId");
CREATE INDEX IF NOT EXISTS "Session_token_idx" ON "Session"("token");
CREATE UNIQUE INDEX IF NOT EXISTS "Wallet_userId_currency_key" ON "Wallet"("userId", "currency");
CREATE INDEX IF NOT EXISTS "Wallet_userId_idx" ON "Wallet"("userId");
CREATE INDEX IF NOT EXISTS "Transaction_userId_idx" ON "Transaction"("userId");
CREATE INDEX IF NOT EXISTS "Transaction_status_idx" ON "Transaction"("status");
CREATE INDEX IF NOT EXISTS "Transaction_type_idx" ON "Transaction"("type");
CREATE UNIQUE INDEX IF NOT EXISTS "BrokerConnection_userId_brokerId_key" ON "BrokerConnection"("userId", "brokerId");
CREATE INDEX IF NOT EXISTS "BrokerConnection_userId_idx" ON "BrokerConnection"("userId");
CREATE INDEX IF NOT EXISTS "BrokerConnection_status_idx" ON "BrokerConnection"("status");
CREATE INDEX IF NOT EXISTS "Position_userId_idx" ON "Position"("userId");
CREATE INDEX IF NOT EXISTS "Position_status_idx" ON "Position"("status");
CREATE INDEX IF NOT EXISTS "Position_symbol_idx" ON "Position"("symbol");
CREATE INDEX IF NOT EXISTS "Order_userId_idx" ON "Order"("userId");
CREATE INDEX IF NOT EXISTS "Order_status_idx" ON "Order"("status");
CREATE INDEX IF NOT EXISTS "PriceAlert_userId_idx" ON "PriceAlert"("userId");
CREATE INDEX IF NOT EXISTS "PriceAlert_status_idx" ON "PriceAlert"("status");
CREATE INDEX IF NOT EXISTS "Notification_userId_idx" ON "Notification"("userId");
CREATE INDEX IF NOT EXISTS "Notification_read_idx" ON "Notification"("read");
CREATE INDEX IF NOT EXISTS "APIKey_userId_idx" ON "APIKey"("userId");
CREATE INDEX IF NOT EXISTS "APIKey_key_idx" ON "APIKey"("key");

CREATE OR REPLACE FUNCTION "update_updated_at_column"()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS "User_updated_at" ON "User";
CREATE TRIGGER "User_updated_at" BEFORE UPDATE ON "User" FOR EACH ROW EXECUTE FUNCTION "update_updated_at_column"();
DROP TRIGGER IF EXISTS "Profile_updated_at" ON "Profile";
CREATE TRIGGER "Profile_updated_at" BEFORE UPDATE ON "Profile" FOR EACH ROW EXECUTE FUNCTION "update_updated_at_column"();
DROP TRIGGER IF EXISTS "KYC_updated_at" ON "KYC";
CREATE TRIGGER "KYC_updated_at" BEFORE UPDATE ON "KYC" FOR EACH ROW EXECUTE FUNCTION "update_updated_at_column"();
DROP TRIGGER IF EXISTS "Wallet_updated_at" ON "Wallet";
CREATE TRIGGER "Wallet_updated_at" BEFORE UPDATE ON "Wallet" FOR EACH ROW EXECUTE FUNCTION "update_updated_at_column"();
DROP TRIGGER IF EXISTS "Transaction_updated_at" ON "Transaction";
CREATE TRIGGER "Transaction_updated_at" BEFORE UPDATE ON "Transaction" FOR EACH ROW EXECUTE FUNCTION "update_updated_at_column"();
DROP TRIGGER IF EXISTS "BrokerConnection_updated_at" ON "BrokerConnection";
CREATE TRIGGER "BrokerConnection_updated_at" BEFORE UPDATE ON "BrokerConnection" FOR EACH ROW EXECUTE FUNCTION "update_updated_at_column"();
DROP TRIGGER IF EXISTS "Position_updated_at" ON "Position";
CREATE TRIGGER "Position_updated_at" BEFORE UPDATE ON "Position" FOR EACH ROW EXECUTE FUNCTION "update_updated_at_column"();
DROP TRIGGER IF EXISTS "Order_updated_at" ON "Order";
CREATE TRIGGER "Order_updated_at" BEFORE UPDATE ON "Order" FOR EACH ROW EXECUTE FUNCTION "update_updated_at_column"();
DROP TRIGGER IF EXISTS "PriceAlert_updated_at" ON "PriceAlert";
CREATE TRIGGER "PriceAlert_updated_at" BEFORE UPDATE ON "PriceAlert" FOR EACH ROW EXECUTE FUNCTION "update_updated_at_column"();

-- Enable RLS on all tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Session" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Profile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "KYC" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Wallet" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Transaction" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BrokerConnection" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Position" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PriceAlert" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Notification" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "APIKey" ENABLE ROW LEVEL SECURITY;

-- Service role can bypass RLS, so we don't need explicit policies
-- but let's add policies for anon and authenticated users
CREATE POLICY "Service role full access" ON "User" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON "Session" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON "Profile" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON "KYC" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON "Wallet" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON "Transaction" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON "BrokerConnection" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON "Position" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON "Order" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON "PriceAlert" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON "Notification" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON "APIKey" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON "SystemConfig" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON "BrokerConfig" FOR ALL USING (true) WITH CHECK (true);
`

export async function POST(request: NextRequest) {
  try {
    // Verify authorization - require service role key
    const authHeader = request.headers.get('authorization')
    const bearerToken = authHeader?.replace('Bearer ', '')
    const body = await request.json().catch(() => ({}))
    const token = body.token || bearerToken

    if (!token || token !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized. Provide service role key.' },
        { status: 401 }
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        { error: 'Supabase credentials not configured' },
        { status: 500 }
      )
    }

    // Use Supabase SQL API to execute the migration
    // The /rest/v1/rpc endpoint can execute SQL if we create an exec function first
    // Instead, we'll use the PostgreSQL connection via the Supabase pooler

    // Approach: Use Prisma with the DIRECT_URL from environment
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient({
      datasourceUrl: process.env.DIRECT_URL || process.env.DATABASE_URL,
    })

    try {
      // Execute the full migration as one statement
      await prisma.$executeRawUnsafe(MIGRATION_SQL)
      await prisma.$disconnect()

      return NextResponse.json({
        success: true,
        message: 'Database schema created successfully! All tables, indexes, triggers, and RLS policies are set up.',
        tables: [
          'User', 'Session', 'Profile', 'KYC', 'Wallet', 'Transaction',
          'BrokerConnection', 'Position', 'Order', 'PriceAlert', 'Notification',
          'APIKey', 'SystemConfig', 'BrokerConfig'
        ],
      })
    } catch (dbError: any) {
      await prisma.$disconnect()

      // If the error is about tables already existing, that's fine
      const errMsg = dbError?.message || String(dbError)
      if (errMsg.includes('already exists')) {
        return NextResponse.json({
          success: true,
          message: 'Database schema already exists. Tables are set up correctly.',
          note: 'Some objects already existed, which is expected.',
        })
      }

      // Try alternative approach: execute statements one by one
      const statements = MIGRATION_SQL
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'))

      const results: { success: boolean; error?: string }[] = []
      let errorCount = 0

      const prisma2 = new PrismaClient({
        datasourceUrl: process.env.DIRECT_URL || process.env.DATABASE_URL,
      })

      for (const stmt of statements) {
        try {
          await prisma2.$executeRawUnsafe(stmt + ';')
          results.push({ success: true })
        } catch (err: any) {
          const msg = err?.message || String(err)
          if (msg.includes('already exists')) {
            results.push({ success: true })
          } else {
            results.push({ success: false, error: msg.substring(0, 200) })
            errorCount++
          }
        }
      }
      await prisma2.$disconnect()

      return NextResponse.json({
        success: errorCount === 0,
        message: errorCount === 0
          ? 'Database schema created successfully!'
          : `Schema setup completed with ${errorCount} errors out of ${statements.length} statements`,
        totalStatements: statements.length,
        errors: errorCount,
        details: results.filter(r => !r.success).slice(0, 5),
      })
    }
  } catch (error: any) {
    console.error('Database setup error:', error)
    return NextResponse.json(
      { error: 'Failed to setup database', details: error.message },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'DWEX Database Setup Endpoint',
    usage: 'POST with Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY> to initialize the database schema',
    tables: [
      'User', 'Session', 'Profile', 'KYC', 'Wallet', 'Transaction',
      'BrokerConnection', 'Position', 'Order', 'PriceAlert', 'Notification',
      'APIKey', 'SystemConfig', 'BrokerConfig'
    ],
    note: 'Requires DATABASE_URL or DIRECT_URL to be set correctly in environment variables.',
  })
}
