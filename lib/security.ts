/**
 * Security utilities for La Brioche application
 */

import { NextRequest } from 'next/server'

// Input sanitization
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return ''
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .slice(0, 1000) // Limit length
}

export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') return ''
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const cleaned = email.trim().toLowerCase().slice(0, 254) // RFC limit
  
  return emailRegex.test(cleaned) ? cleaned : ''
}

export function sanitizePhone(phone: string): string {
  if (typeof phone !== 'string') return ''
  
  // Remove all non-digit characters except + and spaces
  const cleaned = phone.replace(/[^\d\s+()-]/g, '').trim().slice(0, 20)
  
  return cleaned
}

export function sanitizeOrderNumber(orderNumber: string): string {
  if (typeof orderNumber !== 'string') return ''
  
  // Allow only alphanumeric characters and hyphens
  return orderNumber.replace(/[^a-zA-Z0-9-]/g, '').slice(0, 50)
}

// Rate limiting helpers
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function rateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60000 // 1 minute
): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  
  // Clean up old entries
  for (const [key, value] of rateLimitMap.entries()) {
    if (value.resetTime < now) {
      rateLimitMap.delete(key)
    }
  }
  
  const current = rateLimitMap.get(identifier)
  
  if (!current || current.resetTime < now) {
    // First request in window or window expired
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs })
    return { success: true, remaining: limit - 1, resetTime: now + windowMs }
  }
  
  if (current.count >= limit) {
    // Rate limit exceeded
    return { success: false, remaining: 0, resetTime: current.resetTime }
  }
  
  // Increment counter
  current.count++
  return { success: true, remaining: limit - current.count, resetTime: current.resetTime }
}

// CSRF protection
export function generateCSRFToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

export function validateCSRFToken(token: string, expected: string): boolean {
  if (typeof token !== 'string' || typeof expected !== 'string') return false
  if (token.length !== expected.length) return false
  
  // Constant-time comparison to prevent timing attacks
  let result = 0
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ expected.charCodeAt(i)
  }
  
  return result === 0
}

// Content Security Policy helpers
export function getCSPNonce(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return btoa(String.fromCharCode(...array))
}

// Request validation
export function validateRequest(request: NextRequest): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  // Check content type for POST requests
  if (request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH') {
    const contentType = request.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      errors.push('Invalid content type')
    }
  }
  
  // Check for common security headers
  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')
  
  if (process.env.NODE_ENV === 'production') {
    const allowedOrigins = [
      'https://labriochenorfolk.com',
      'https://www.labriochenorfolk.com'
    ]
    
    if (origin && !allowedOrigins.includes(origin)) {
      errors.push('Invalid origin')
    }
    
    if (referer && !allowedOrigins.some(allowed => referer.startsWith(allowed))) {
      errors.push('Invalid referer')
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// SQL injection prevention (for raw queries if ever needed)
export function escapeSQL(input: string): string {
  if (typeof input !== 'string') return ''
  
  return input
    .replace(/'/g, "''")
    .replace(/;/g, '') // Remove semicolons
    .replace(/--/g, '') // Remove SQL comments
    .replace(/\/\*/g, '') // Remove multi-line comments
    .replace(/\*\//g, '')
}

// XSS prevention
export function escapeHTML(input: string): string {
  if (typeof input !== 'string') return ''
  
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  }
  
  return input.replace(/[&<>"'/]/g, (match) => htmlEscapes[match])
}

// Password security (for future auth enhancements)
export function validatePasswordStrength(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// File upload security
export function validateFileUpload(file: File): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  const maxSize = 5 * 1024 * 1024 // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    errors.push('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.')
  }
  
  if (file.size > maxSize) {
    errors.push('File size too large. Maximum size is 5MB.')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Environment variable validation
export function validateEnvironmentVariables(): {
  isValid: boolean
  missingVariables: string[]
} {
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET'
  ]
  
  const missingVariables = requiredVars.filter(
    varName => !process.env[varName]
  )
  
  return {
    isValid: missingVariables.length === 0,
    missingVariables
  }
}

// IP address extraction (for rate limiting and logging)
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return 'unknown'
}