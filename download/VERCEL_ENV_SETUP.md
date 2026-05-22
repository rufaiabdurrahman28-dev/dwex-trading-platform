# ═══════════════════════════════════════════════════════
# DWEX — Vercel Environment Variables
# Set these in your Vercel project dashboard → Settings → Environment Variables
# ═══════════════════════════════════════════════════════

# 1. DATABASE_URL — Supabase PostgreSQL (pooled connection for serverless)
#    Get this from: Supabase Dashboard → Project Settings → Database → Connection string
#    Choose "Connection pooling" mode, URI format
#    Example: postgresql://postgres.XXXX:PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
DATABASE_URL=

# 2. DIRECT_URL — Supabase PostgreSQL (direct connection for migrations)
#    Get this from: Supabase Dashboard → Project Settings → Database → Connection string
#    Choose "Direct connection" mode, URI format
#    Example: postgresql://postgres.XXXX:PASSWORD@aws-0-REGION.pooler.supabase.com:5432/postgres
DIRECT_URL=

# 3. NEXT_PUBLIC_SUPABASE_URL — Your Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=https://mfqxuddjomrobrcyczpf.supabase.co

# 4. NEXT_PUBLIC_SUPABASE_ANON_KEY — Your Supabase anon/public key
#    Get from: Supabase Dashboard → Project Settings → API → Project API keys → anon public
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# 5. SUPABASE_SERVICE_ROLE_KEY — Your Supabase service role key (secret!)
#    Get from: Supabase Dashboard → Project Settings → API → Project API keys → service_role
SUPABASE_SERVICE_ROLE_KEY=
