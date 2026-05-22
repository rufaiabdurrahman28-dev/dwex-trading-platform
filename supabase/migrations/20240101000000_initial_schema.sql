-- ============================================================================
-- DWEX Trading Platform - Initial Database Migration
-- Compatible with Supabase PostgreSQL
-- Generated from Prisma schema
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossl";

-- ============================================================================
-- TABLE: User
-- ============================================================================
CREATE TABLE IF NOT EXISTS "User" (
  "id"                TEXT NOT NULL PRIMARY KEY,
  "email"             TEXT NOT NULL UNIQUE,
  "passwordHash"      TEXT NOT NULL,
  "fullName"          TEXT NOT NULL,
  "phone"             TEXT,
  "country"           TEXT NOT NULL DEFAULT 'Nigeria',
  "role"              TEXT NOT NULL DEFAULT 'trader',
  "accountStatus"     TEXT NOT NULL DEFAULT 'active',
  "emailVerified"     BOOLEAN NOT NULL DEFAULT false,
  "twoFactorEnabled"  BOOLEAN NOT NULL DEFAULT false,
  "twoFactorSecret"   TEXT,
  "transactionPin"    TEXT,
  "avatarUrl"         TEXT,
  "createdAt"         TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"         TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- TABLE: Session
-- ============================================================================
CREATE TABLE IF NOT EXISTS "Session" (
  "id"        TEXT NOT NULL PRIMARY KEY,
  "userId"    TEXT NOT NULL,
  "token"     TEXT NOT NULL UNIQUE,
  "userAgent" TEXT,
  "ip"        TEXT,
  "expiresAt" TIMESTAMPTZ NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT "Session_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Session_userId_idx" ON "Session"("userId");
CREATE INDEX IF NOT EXISTS "Session_token_idx" ON "Session"("token");

-- ============================================================================
-- TABLE: Profile
-- ============================================================================
CREATE TABLE IF NOT EXISTS "Profile" (
  "id"          TEXT NOT NULL PRIMARY KEY,
  "userId"      TEXT NOT NULL UNIQUE,
  "displayName" TEXT,
  "bio"         TEXT,
  "address"     TEXT,
  "city"        TEXT,
  "state"       TEXT,
  "zipCode"     TEXT,
  "dateOfBirth" TEXT,
  "nationality" TEXT,
  "occupation"  TEXT,
  "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"   TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT "Profile_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================================================================
-- TABLE: KYC
-- ============================================================================
CREATE TABLE IF NOT EXISTS "KYC" (
  "id"               TEXT NOT NULL PRIMARY KEY,
  "userId"           TEXT NOT NULL UNIQUE,
  "status"           TEXT NOT NULL DEFAULT 'none',
  "documentType"     TEXT,
  "documentNumber"   TEXT,
  "documentFrontUrl" TEXT,
  "documentBackUrl"  TEXT,
  "selfieUrl"        TEXT,
  "addressProofUrl"  TEXT,
  "reviewedBy"       TEXT,
  "reviewNote"       TEXT,
  "submittedAt"      TIMESTAMPTZ,
  "reviewedAt"       TIMESTAMPTZ,
  "createdAt"        TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"        TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT "KYC_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================================================================
-- TABLE: Wallet
-- ============================================================================
CREATE TABLE IF NOT EXISTS "Wallet" (
  "id"        TEXT NOT NULL PRIMARY KEY,
  "userId"    TEXT NOT NULL,
  "currency"  TEXT NOT NULL DEFAULT 'NGN',
  "balance"   DOUBLE PRECISION NOT NULL DEFAULT 0,
  "locked"    DOUBLE PRECISION NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT "Wallet_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "Wallet_userId_currency_key" ON "Wallet"("userId", "currency");
CREATE INDEX IF NOT EXISTS "Wallet_userId_idx" ON "Wallet"("userId");

-- ============================================================================
-- TABLE: Transaction
-- ============================================================================
CREATE TABLE IF NOT EXISTS "Transaction" (
  "id"          TEXT NOT NULL PRIMARY KEY,
  "userId"      TEXT NOT NULL,
  "type"        TEXT NOT NULL,
  "amount"      DOUBLE PRECISION NOT NULL,
  "currency"    TEXT NOT NULL DEFAULT 'NGN',
  "status"      TEXT NOT NULL DEFAULT 'pending',
  "method"      TEXT,
  "reference"   TEXT,
  "description" TEXT,
  "metadata"    TEXT,
  "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"   TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT "Transaction_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Transaction_userId_idx" ON "Transaction"("userId");
CREATE INDEX IF NOT EXISTS "Transaction_status_idx" ON "Transaction"("status");
CREATE INDEX IF NOT EXISTS "Transaction_type_idx" ON "Transaction"("type");

-- ============================================================================
-- TABLE: BrokerConnection
-- ============================================================================
CREATE TABLE IF NOT EXISTS "BrokerConnection" (
  "id"           TEXT NOT NULL PRIMARY KEY,
  "userId"       TEXT NOT NULL,
  "brokerId"     TEXT NOT NULL,
  "brokerName"   TEXT NOT NULL,
  "status"       TEXT NOT NULL DEFAULT 'disconnected',
  "accountId"    TEXT,
  "accessToken"  TEXT,
  "refreshToken" TEXT,
  "lastSyncedAt" TIMESTAMPTZ,
  "metadata"     TEXT,
  "createdAt"    TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"    TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT "BrokerConnection_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "BrokerConnection_userId_brokerId_key" ON "BrokerConnection"("userId", "brokerId");
CREATE INDEX IF NOT EXISTS "BrokerConnection_userId_idx" ON "BrokerConnection"("userId");
CREATE INDEX IF NOT EXISTS "BrokerConnection_status_idx" ON "BrokerConnection"("status");

-- ============================================================================
-- TABLE: Position
-- ============================================================================
CREATE TABLE IF NOT EXISTS "Position" (
  "id"         TEXT NOT NULL PRIMARY KEY,
  "userId"     TEXT NOT NULL,
  "brokerId"   TEXT NOT NULL,
  "symbol"     TEXT NOT NULL,
  "direction"  TEXT NOT NULL,
  "lotSize"    DOUBLE PRECISION NOT NULL,
  "openPrice"  DOUBLE PRECISION NOT NULL,
  "closePrice" DOUBLE PRECISION,
  "stopLoss"   DOUBLE PRECISION,
  "takeProfit" DOUBLE PRECISION,
  "pnl"        DOUBLE PRECISION NOT NULL DEFAULT 0,
  "swap"       DOUBLE PRECISION NOT NULL DEFAULT 0,
  "commission" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "margin"     DOUBLE PRECISION NOT NULL DEFAULT 0,
  "leverage"   INTEGER NOT NULL DEFAULT 1,
  "status"     TEXT NOT NULL DEFAULT 'open',
  "openedAt"   TIMESTAMPTZ NOT NULL DEFAULT now(),
  "closedAt"   TIMESTAMPTZ,
  "createdAt"  TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"  TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT "Position_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Position_userId_idx" ON "Position"("userId");
CREATE INDEX IF NOT EXISTS "Position_status_idx" ON "Position"("status");
CREATE INDEX IF NOT EXISTS "Position_symbol_idx" ON "Position"("symbol");

-- ============================================================================
-- TABLE: Order
-- ============================================================================
CREATE TABLE IF NOT EXISTS "Order" (
  "id"          TEXT NOT NULL PRIMARY KEY,
  "userId"      TEXT NOT NULL,
  "brokerId"    TEXT NOT NULL,
  "symbol"      TEXT NOT NULL,
  "direction"   TEXT NOT NULL,
  "orderType"   TEXT NOT NULL,
  "lotSize"     DOUBLE PRECISION NOT NULL,
  "price"       DOUBLE PRECISION,
  "stopLoss"    DOUBLE PRECISION,
  "takeProfit"  DOUBLE PRECISION,
  "status"      TEXT NOT NULL DEFAULT 'pending',
  "filledPrice" DOUBLE PRECISION,
  "filledAt"    TIMESTAMPTZ,
  "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"   TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT "Order_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Order_userId_idx" ON "Order"("userId");
CREATE INDEX IF NOT EXISTS "Order_status_idx" ON "Order"("status");

-- ============================================================================
-- TABLE: PriceAlert
-- ============================================================================
CREATE TABLE IF NOT EXISTS "PriceAlert" (
  "id"           TEXT NOT NULL PRIMARY KEY,
  "userId"       TEXT NOT NULL,
  "symbol"       TEXT NOT NULL,
  "condition"    TEXT NOT NULL,
  "targetPrice"  DOUBLE PRECISION NOT NULL,
  "currentPrice" DOUBLE PRECISION,
  "status"       TEXT NOT NULL DEFAULT 'active',
  "triggeredAt"  TIMESTAMPTZ,
  "createdAt"    TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"    TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT "PriceAlert_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "PriceAlert_userId_idx" ON "PriceAlert"("userId");
CREATE INDEX IF NOT EXISTS "PriceAlert_status_idx" ON "PriceAlert"("status");

-- ============================================================================
-- TABLE: Notification
-- ============================================================================
CREATE TABLE IF NOT EXISTS "Notification" (
  "id"        TEXT NOT NULL PRIMARY KEY,
  "userId"    TEXT NOT NULL,
  "type"      TEXT NOT NULL,
  "title"     TEXT NOT NULL,
  "message"   TEXT NOT NULL,
  "read"      BOOLEAN NOT NULL DEFAULT false,
  "metadata"  TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT "Notification_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Notification_userId_idx" ON "Notification"("userId");
CREATE INDEX IF NOT EXISTS "Notification_read_idx" ON "Notification"("read");

-- ============================================================================
-- TABLE: APIKey
-- ============================================================================
CREATE TABLE IF NOT EXISTS "APIKey" (
  "id"          TEXT NOT NULL PRIMARY KEY,
  "userId"      TEXT NOT NULL,
  "name"        TEXT NOT NULL,
  "key"         TEXT NOT NULL UNIQUE,
  "secret"      TEXT NOT NULL,
  "permissions" TEXT NOT NULL DEFAULT 'read',
  "lastUsedAt"  TIMESTAMPTZ,
  "expiresAt"   TIMESTAMPTZ,
  "status"      TEXT NOT NULL DEFAULT 'active',
  "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT "APIKey_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "APIKey_userId_idx" ON "APIKey"("userId");
CREATE INDEX IF NOT EXISTS "APIKey_key_idx" ON "APIKey"("key");

-- ============================================================================
-- TABLE: SystemConfig
-- ============================================================================
CREATE TABLE IF NOT EXISTS "SystemConfig" (
  "id"    TEXT NOT NULL PRIMARY KEY,
  "key"   TEXT NOT NULL UNIQUE,
  "value" TEXT NOT NULL
);

-- ============================================================================
-- TABLE: BrokerConfig
-- ============================================================================
CREATE TABLE IF NOT EXISTS "BrokerConfig" (
  "id"          TEXT NOT NULL PRIMARY KEY,
  "brokerId"    TEXT NOT NULL UNIQUE,
  "brokerName"  TEXT NOT NULL,
  "apiEndpoint" TEXT,
  "isActive"    BOOLEAN NOT NULL DEFAULT true,
  "config"      TEXT
);

-- ============================================================================
-- UPDATED_AT TRIGGER FUNCTION
-- Automatically updates the "updatedAt" column on row modification
-- ============================================================================
CREATE OR REPLACE FUNCTION "update_updated_at_column"()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updatedAt triggers to all tables that have an "updatedAt" column
CREATE TRIGGER "User_updated_at"
  BEFORE UPDATE ON "User"
  FOR EACH ROW
  EXECUTE FUNCTION "update_updated_at_column"();

CREATE TRIGGER "Profile_updated_at"
  BEFORE UPDATE ON "Profile"
  FOR EACH ROW
  EXECUTE FUNCTION "update_updated_at_column"();

CREATE TRIGGER "KYC_updated_at"
  BEFORE UPDATE ON "KYC"
  FOR EACH ROW
  EXECUTE FUNCTION "update_updated_at_column"();

CREATE TRIGGER "Wallet_updated_at"
  BEFORE UPDATE ON "Wallet"
  FOR EACH ROW
  EXECUTE FUNCTION "update_updated_at_column"();

CREATE TRIGGER "Transaction_updated_at"
  BEFORE UPDATE ON "Transaction"
  FOR EACH ROW
  EXECUTE FUNCTION "update_updated_at_column"();

CREATE TRIGGER "BrokerConnection_updated_at"
  BEFORE UPDATE ON "BrokerConnection"
  FOR EACH ROW
  EXECUTE FUNCTION "update_updated_at_column"();

CREATE TRIGGER "Position_updated_at"
  BEFORE UPDATE ON "Position"
  FOR EACH ROW
  EXECUTE FUNCTION "update_updated_at_column"();

CREATE TRIGGER "Order_updated_at"
  BEFORE UPDATE ON "Order"
  FOR EACH ROW
  EXECUTE FUNCTION "update_updated_at_column"();

CREATE TRIGGER "PriceAlert_updated_at"
  BEFORE UPDATE ON "PriceAlert"
  FOR EACH ROW
  EXECUTE FUNCTION "update_updated_at_column"();

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
