/**
 * DWEX Security Middleware — Request validation and threat detection
 *
 * Layer 3: Even if auth is bypassed, this catches suspicious patterns
 */

import { logAudit, detectSuspiciousActivity } from './audit-log'
import { getClientIp } from './rate-limit'

// Known malicious user agents (bots, scanners, exploit tools)
const BLOCKED_USER_AGENTS = [
  'sqlmap',
  'nikto',
  'nmap',
  'masscan',
  'dirbuster',
  'gobuster',
  'wfuzz',
  'burpsuite',
  'owasp zap',
  'hydra',
  'metasploit',
  'w3af',
  'acunetix',
  'nessus',
  'openvas',
]

// Paths that attackers commonly probe
const SENSITIVE_PATHS = [
  '/.env',
  '/.git',
  '/wp-admin',
  '/wp-login',
  '/phpmyadmin',
  '/admin/config',
  '/api/keys',
  '/api/tokens',
  '/api/secrets',
  '/debug',
  '/console',
  '/actuator',
  '/.well-known/security.txt',
]

// SQL injection patterns in URL
const SQL_INJECTION_PATTERNS = [
  /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
  /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
  /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i,
  /exec(\s|\+)+(s|x)p\w*/i,
  /union(\s|\+)+select/i,
  /insert(\s|\+)+into/i,
  /delete(\s|\+)+from/i,
  /drop(\s|\+)+table/i,
]

// XSS patterns in URL
const XSS_PATTERNS = [
  /<script[^>]*>/i,
  /javascript:/i,
  /on\w+\s*=/i,
  /eval\(/i,
  /expression\(/i,
  /vbscript:/i,
]

export interface SecurityCheckResult {
  safe: boolean
  reason?: string
  severity?: 'low' | 'medium' | 'high' | 'critical'
}

/**
 * Check request for malicious patterns
 * Returns whether the request is safe, and why if not
 */
export function checkRequestSecurity(request: Request): SecurityCheckResult {
  const ip = getClientIp(request)
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase()
  const path = new URL(request.url).pathname
  const query = new URL(request.url).search

  // 1. Block known malicious user agents
  for (const blocked of BLOCKED_USER_AGENTS) {
    if (userAgent.includes(blocked)) {
      logAudit({
        action: 'suspicious_activity',
        ip,
        userAgent,
        path,
        method: request.method,
        result: 'blocked',
        details: { reason: 'blocked_user_agent', agent: blocked },
      })
      return { safe: false, reason: `Blocked user agent: ${blocked}`, severity: 'high' }
    }
  }

  // 2. Block probes for sensitive paths
  for (const sensitivePath of SENSITIVE_PATHS) {
    if (path.toLowerCase().startsWith(sensitivePath)) {
      logAudit({
        action: 'suspicious_activity',
        ip,
        userAgent,
        path,
        method: request.method,
        result: 'blocked',
        details: { reason: 'sensitive_path_probe' },
      })
      return { safe: false, reason: `Sensitive path probe: ${path}`, severity: 'high' }
    }
  }

  // 3. Detect SQL injection attempts in URL
  for (const pattern of SQL_INJECTION_PATTERNS) {
    if (pattern.test(path) || pattern.test(query)) {
      logAudit({
        action: 'suspicious_activity',
        ip,
        userAgent,
        path,
        method: request.method,
        result: 'blocked',
        details: { reason: 'sql_injection_attempt', pattern: pattern.source },
      })
      return { safe: false, reason: 'SQL injection pattern detected', severity: 'critical' }
    }
  }

  // 4. Detect XSS attempts in URL
  for (const pattern of XSS_PATTERNS) {
    if (pattern.test(path) || pattern.test(query)) {
      logAudit({
        action: 'suspicious_activity',
        ip,
        userAgent,
        path,
        method: request.method,
        result: 'blocked',
        details: { reason: 'xss_attempt', pattern: pattern.source },
      })
      return { safe: false, reason: 'XSS pattern detected', severity: 'critical' }
    }
  }

  // 5. Block requests with no user agent (most bots)
  if (!userAgent || userAgent.length < 5) {
    logAudit({
      action: 'suspicious_activity',
      ip,
      userAgent,
      path,
      method: request.method,
      result: 'blocked',
      details: { reason: 'missing_user_agent' },
    })
    return { safe: false, reason: 'Missing or suspicious user agent', severity: 'medium' }
  }

  return { safe: true }
}

/**
 * Log unauthorized access attempts
 */
export function logUnauthorizedAttempt(request: Request, userId?: string, email?: string) {
  const ip = getClientIp(request)

  logAudit({
    action: 'unauthorized_access_attempt',
    userId,
    email,
    ip,
    userAgent: request.headers.get('user-agent') || undefined,
    path: new URL(request.url).pathname,
    method: request.method,
    result: 'blocked',
    details: {
      target: new URL(request.url).pathname,
    },
  })
}

/**
 * Log successful auth events
 */
export function logAuthSuccess(request: Request, userId: string, email: string, action: 'login_success' | 'signup_success') {
  const ip = getClientIp(request)

  logAudit({
    action,
    userId,
    email,
    ip,
    userAgent: request.headers.get('user-agent') || undefined,
    result: 'success',
  })
}

/**
 * Log failed auth events
 */
export function logAuthFailure(request: Request, email: string, reason: string) {
  const ip = getClientIp(request)

  logAudit({
    action: 'login_failure',
    email,
    ip,
    userAgent: request.headers.get('user-agent') || undefined,
    result: 'failure',
    details: { reason },
  })
}
