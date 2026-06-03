/**
 * DWEX Audit Logger — Tracks all security-sensitive actions
 *
 * Layer 2: If someone bypasses auth, we STILL know they were there.
 * Every admin action, failed login, and suspicious activity is logged.
 */

export type AuditAction =
  | 'admin_page_access'
  | 'admin_api_call'
  | 'login_success'
  | 'login_failure'
  | 'signup_attempt'
  | 'signup_success'
  | 'unauthorized_access_attempt'
  | 'rate_limit_triggered'
  | 'session_created'
  | 'session_destroyed'
  | 'password_change'
  | 'role_change'
  | 'suspicious_activity'
  | 'token_refresh'

export interface AuditLogEntry {
  action: AuditAction
  userId?: string
  email?: string
  ip: string
  userAgent?: string
  path?: string
  method?: string
  details?: Record<string, unknown>
  timestamp: number
  result: 'success' | 'failure' | 'blocked'
}

// In-memory audit log (last 1000 entries)
// In production, this would go to a database or external logging service
const MAX_LOG_SIZE = 1000
const auditLog: AuditLogEntry[] = []

/**
 * Log a security-sensitive action
 */
export function logAudit(entry: Omit<AuditLogEntry, 'timestamp'>): void {
  const fullEntry: AuditLogEntry = {
    ...entry,
    timestamp: Date.now(),
  }

  auditLog.push(fullEntry)

  // Keep only the last MAX_LOG_SIZE entries
  if (auditLog.length > MAX_LOG_SIZE) {
    auditLog.shift()
  }

  // Log suspicious activity to console (in production: send to monitoring service)
  if (
    entry.action === 'unauthorized_access_attempt' ||
    entry.action === 'rate_limit_triggered' ||
    entry.action === 'suspicious_activity'
  ) {
    console.warn(`[DWEX SECURITY ALERT] ${entry.action}: IP=${entry.ip} Path=${entry.path} Details=${JSON.stringify(entry.details)}`)
  }
}

/**
 * Get recent audit logs (for admin dashboard)
 */
export function getAuditLogs(options?: {
  action?: AuditAction
  userId?: string
  ip?: string
  limit?: number
  result?: 'success' | 'failure' | 'blocked'
}): AuditLogEntry[] {
  let filtered = [...auditLog]

  if (options?.action) {
    filtered = filtered.filter(e => e.action === options.action)
  }
  if (options?.userId) {
    filtered = filtered.filter(e => e.userId === options.userId)
  }
  if (options?.ip) {
    filtered = filtered.filter(e => e.ip === options.ip)
  }
  if (options?.result) {
    filtered = filtered.filter(e => e.result === options.result)
  }

  // Return most recent first
  filtered.sort((a, b) => b.timestamp - a.timestamp)

  return filtered.slice(0, options?.limit || 100)
}

/**
 * Detect suspicious patterns in the audit log
 * Returns alerts if patterns indicate an attack
 */
export function detectSuspiciousActivity(): Array<{ type: string; severity: 'low' | 'medium' | 'high'; message: string; ips: string[] }> {
  const alerts: Array<{ type: string; severity: 'low' | 'medium' | 'high'; message: string; ips: string[] }> = []
  const now = Date.now()
  const oneHourAgo = now - 60 * 60 * 1000
  const fiveMinAgo = now - 5 * 60 * 1000

  // 1. Multiple failed logins from same IP in last hour
  const recentFailures = auditLog.filter(
    e => e.action === 'login_failure' && e.timestamp > oneHourAgo
  )
  const failuresByIp = new Map<string, number>()
  recentFailures.forEach(e => {
    failuresByIp.set(e.ip, (failuresByIp.get(e.ip) || 0) + 1)
  })
  for (const [ip, count] of failuresByIp.entries()) {
    if (count >= 10) {
      alerts.push({
        type: 'brute_force',
        severity: 'high',
        message: `${count} failed login attempts from ${ip} in the last hour`,
        ips: [ip],
      })
    } else if (count >= 5) {
      alerts.push({
        type: 'brute_force',
        severity: 'medium',
        message: `${count} failed login attempts from ${ip} in the last hour`,
        ips: [ip],
      })
    }
  }

  // 2. Unauthorized admin access attempts
  const adminBypassAttempts = auditLog.filter(
    e => e.action === 'unauthorized_access_attempt' && e.timestamp > oneHourAgo && e.path?.startsWith('/admin')
  )
  const bypassIps = [...new Set(adminBypassAttempts.map(e => e.ip))]
  if (bypassIps.length > 0) {
    alerts.push({
      type: 'admin_bypass',
      severity: 'high',
      message: `${adminBypassAttempts.length} unauthorized admin access attempts from ${bypassIps.length} IP(s)`,
      ips: bypassIps,
    })
  }

  // 3. Rapid API calls from same IP (potential DDoS)
  const recentApiCalls = auditLog.filter(
    e => e.timestamp > fiveMinAgo
  )
  const callsByIp = new Map<string, number>()
  recentApiCalls.forEach(e => {
    callsByIp.set(e.ip, (callsByIp.get(e.ip) || 0) + 1)
  })
  for (const [ip, count] of callsByIp.entries()) {
    if (count >= 50) {
      alerts.push({
        type: 'ddos',
        severity: 'high',
        message: `${count} API calls from ${ip} in the last 5 minutes`,
        ips: [ip],
      })
    }
  }

  // 4. Rate limit triggered multiple times
  const rateLimited = auditLog.filter(
    e => e.action === 'rate_limit_triggered' && e.timestamp > oneHourAgo
  )
  if (rateLimited.length >= 3) {
    const rateIps = [...new Set(rateLimited.map(e => e.ip))]
    alerts.push({
      type: 'rate_abuse',
      severity: 'medium',
      message: `Rate limiting triggered ${rateLimited.length} times from ${rateIps.length} IP(s)`,
      ips: rateIps,
    })
  }

  return alerts
}

/**
 * Get security stats summary for admin dashboard
 */
export function getSecurityStats() {
  const now = Date.now()
  const oneHourAgo = now - 60 * 60 * 1000
  const oneDayAgo = now - 24 * 60 * 60 * 1000

  const recentLogs = auditLog.filter(e => e.timestamp > oneDayAgo)

  return {
    totalEvents: auditLog.length,
    last24h: recentLogs.length,
    last1h: auditLog.filter(e => e.timestamp > oneHourAgo).length,
    failedLogins24h: recentLogs.filter(e => e.action === 'login_failure').length,
    unauthorizedAttempts24h: recentLogs.filter(e => e.action === 'unauthorized_access_attempt').length,
    rateLimits24h: recentLogs.filter(e => e.action === 'rate_limit_triggered').length,
    activeAlerts: detectSuspiciousActivity(),
  }
}
