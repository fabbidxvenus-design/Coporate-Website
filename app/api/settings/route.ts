import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { settingsRepository } from '@/lib/repositories'

const ALLOWED_KEYS = [
  'company_name',
  'company_email',
  'company_phone',
  'company_address',
  'company_website',
  'contact_email',
  'recruitment_email',
  'social_facebook',
  'social_linkedin',
  'social_zalo',
]

export async function GET() {
  try {
    const settings = await settingsRepository.getAll()
    return NextResponse.json({ data: settings })
  } catch (error) {
    console.error('Error in GET /api/settings:', error)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin()

    const body = await request.json()
    const { key, value } = body

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: 'Key and value are required' },
        { status: 400 }
      )
    }

    if (!ALLOWED_KEYS.includes(key)) {
      return NextResponse.json(
        { error: 'Invalid setting key' },
        { status: 400 }
      )
    }

    if (key.includes('email') && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        )
      }
    }

    if (key.includes('website') || key.includes('facebook') || key.includes('linkedin')) {
      if (value) {
        try {
          new URL(value)
        } catch {
          return NextResponse.json(
            { error: 'Invalid URL format' },
            { status: 400 }
          )
        }
      }
    }

    await settingsRepository.set(key, value as string)
    return NextResponse.json({ data: { key, value } })
  } catch (error) {
    console.error('Error in PUT /api/settings:', error)
    return NextResponse.json(
      { error: 'Unauthorized or server error' },
      { status: 401 }
    )
  }
}