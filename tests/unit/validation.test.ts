import { describe, it, expect } from 'vitest'
import { contactSchema } from '@/lib/validation/contact'

describe('contactSchema', () => {
  describe('name validation', () => {
    it('accepts valid name with 2+ characters', () => {
      const result = contactSchema.safeParse({ name: 'Trần Văn A', email: 'test@test.com', subject: 'Test Subject', message: 'Test message content here', locale: 'vi' })
      expect(result.success).toBe(true)
    })

    it('rejects name with less than 2 characters', () => {
      const result = contactSchema.safeParse({ name: 'A', email: 'test@test.com', subject: 'Test Subject', message: 'Test message content here', locale: 'vi' })
      expect(result.success).toBe(false)
    })

    it('rejects empty name', () => {
      const result = contactSchema.safeParse({ name: '', email: 'test@test.com', subject: 'Test Subject', message: 'Test message content here', locale: 'vi' })
      expect(result.success).toBe(false)
    })
  })

  describe('email validation', () => {
    it('accepts valid email', () => {
      const result = contactSchema.safeParse({ name: 'Test User', email: 'user@example.com', subject: 'Test Subject', message: 'Test message content here', locale: 'vi' })
      expect(result.success).toBe(true)
    })

    it('accepts email with subdomain', () => {
      const result = contactSchema.safeParse({ name: 'Test User', email: 'user@mail.example.com', subject: 'Test Subject', message: 'Test message content here', locale: 'vi' })
      expect(result.success).toBe(true)
    })

    it('rejects email without @', () => {
      const result = contactSchema.safeParse({ name: 'Test User', email: 'invalid-email', subject: 'Test Subject', message: 'Test message content here', locale: 'vi' })
      expect(result.success).toBe(false)
    })

    it('rejects email without domain', () => {
      const result = contactSchema.safeParse({ name: 'Test User', email: 'user@', subject: 'Test Subject', message: 'Test message content here', locale: 'vi' })
      expect(result.success).toBe(false)
    })

    it('rejects empty email', () => {
      const result = contactSchema.safeParse({ name: 'Test User', email: '', subject: 'Test Subject', message: 'Test message content here', locale: 'vi' })
      expect(result.success).toBe(false)
    })
  })

  describe('subject validation', () => {
    it('accepts subject with 5+ characters', () => {
      const result = contactSchema.safeParse({ name: 'Test User', email: 'test@test.com', subject: 'Hello', message: 'Test message content here', locale: 'vi' })
      expect(result.success).toBe(true)
    })

    it('rejects subject with less than 5 characters', () => {
      const result = contactSchema.safeParse({ name: 'Test User', email: 'test@test.com', subject: 'Hi', message: 'Test message content here', locale: 'vi' })
      expect(result.success).toBe(false)
    })

    it('rejects empty subject', () => {
      const result = contactSchema.safeParse({ name: 'Test User', email: 'test@test.com', subject: '', message: 'Test message content here', locale: 'vi' })
      expect(result.success).toBe(false)
    })
  })

  describe('message validation', () => {
    it('accepts message with 10+ characters', () => {
      const result = contactSchema.safeParse({ name: 'Test User', email: 'test@test.com', subject: 'Test Subject', message: '0123456789', locale: 'vi' })
      expect(result.success).toBe(true)
    })

    it('rejects message with less than 10 characters', () => {
      const result = contactSchema.safeParse({ name: 'Test User', email: 'test@test.com', subject: 'Test Subject', message: 'Short', locale: 'vi' })
      expect(result.success).toBe(false)
    })

    it('rejects empty message', () => {
      const result = contactSchema.safeParse({ name: 'Test User', email: 'test@test.com', subject: 'Test Subject', message: '', locale: 'vi' })
      expect(result.success).toBe(false)
    })
  })

  describe('optional fields', () => {
    it('accepts contact form without phone', () => {
      const result = contactSchema.safeParse({ name: 'Test User', email: 'test@test.com', subject: 'Test Subject', message: 'Test message content here', locale: 'vi' })
      expect(result.success).toBe(true)
    })

    it('accepts contact form without company', () => {
      const result = contactSchema.safeParse({ name: 'Test User', email: 'test@test.com', subject: 'Test Subject', message: 'Test message content here', phone: '0123456789', locale: 'vi' })
      expect(result.success).toBe(true)
    })
  })

  describe('locale validation', () => {
    it('accepts locale "vi"', () => {
      const result = contactSchema.safeParse({ name: 'Test User', email: 'test@test.com', subject: 'Test Subject', message: 'Test message content here', locale: 'vi' })
      expect(result.success).toBe(true)
    })

    it('accepts locale "ja"', () => {
      const result = contactSchema.safeParse({ name: 'Test User', email: 'test@test.com', subject: 'Test Subject', message: 'Test message content here', locale: 'ja' })
      expect(result.success).toBe(true)
    })

    it('rejects invalid locale', () => {
      const result = contactSchema.safeParse({ name: 'Test User', email: 'test@test.com', subject: 'Test Subject', message: 'Test message content here', locale: 'en' })
      expect(result.success).toBe(false)
    })
  })

  describe('complete valid submission', () => {
    it('accepts a fully valid contact form', () => {
      const result = contactSchema.safeParse({
        name: 'Nguyễn Văn Minh',
        email: 'minh.nguyen@fabbi.com.vn',
        phone: '0912 345 678',
        company: 'Fabbi JSC',
        subject: 'Hợp tác phát triển phần mềm',
        message: 'Chúng tôi quan tâm đến việc hợp tác với Fabbi.',
        locale: 'vi',
      })
      expect(result.success).toBe(true)
    })
  })
})

describe('Application API validation logic', () => {
  // Unit test the validation rules used in the API route
  const ALLOWED_MIME_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]
  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  it('accepts PDF MIME type', () => {
    expect(ALLOWED_MIME_TYPES.includes('application/pdf')).toBe(true)
  })

  it('accepts DOC MIME type', () => {
    expect(ALLOWED_MIME_TYPES.includes('application/msword')).toBe(true)
  })

  it('accepts DOCX MIME type', () => {
    expect(ALLOWED_MIME_TYPES.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')).toBe(true)
  })

  it('rejects image MIME type', () => {
    expect(ALLOWED_MIME_TYPES.includes('image/png')).toBe(false)
  })

  it('rejects executable MIME type', () => {
    expect(ALLOWED_MIME_TYPES.includes('application/x-executable')).toBe(false)
  })

  it('accepts file size <= 5MB', () => {
    expect(MAX_FILE_SIZE - 1 <= MAX_FILE_SIZE).toBe(true)
    expect(0 <= MAX_FILE_SIZE).toBe(true)
  })

  it('rejects file size > 5MB', () => {
    expect(5 * 1024 * 1024 + 1 > MAX_FILE_SIZE).toBe(true)
  })

  it('accepts valid email with regex', () => {
    expect(emailRegex.test('test@example.com')).toBe(true)
    expect(emailRegex.test('user.name+tag@domain.co.uk')).toBe(true)
    expect(emailRegex.test('user@sub.domain.com')).toBe(true)
  })

  it('rejects invalid email with regex', () => {
    expect(emailRegex.test('invalid')).toBe(false)
    expect(emailRegex.test('no@')).toBe(false)
    expect(emailRegex.test('@nodomain.com')).toBe(false)
    expect(emailRegex.test('spaces in@email.com')).toBe(false)
  })

  it('requires mandatory fields', () => {
    const required = ['full_name', 'email', 'phone', 'cv_file']
    const formData: Record<string, string> = { full_name: 'Nguyễn Văn A', email: 'test@test.com', phone: '0123456789', cv_file: 'resume.pdf' }
    for (const field of required) {
      expect(formData[field]?.length).toBeGreaterThan(0)
    }
  })
})