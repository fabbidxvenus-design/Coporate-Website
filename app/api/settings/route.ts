import { NextRequest, NextResponse } from 'next/server'
import { createClient, USE_MOCK_DATA } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import type { Database } from '@/types/database'

type Setting = Database['public']['Tables']['site_settings']['Row']

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
    if (USE_MOCK_DATA) {
      return NextResponse.json(
        { error: 'API not available in mock data mode' },
        { status: 503 }
      )
    }

    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const { data, error } = await supabase
      .from('site_settings')
      .select('*')

    if (error) {
      console.error('Error fetching settings:', error)
      return NextResponse.json(
        { error: 'Failed to fetch settings' },
        { status: 500 }
      )
    }

    const settings: Record<string, string> = {}
    for (const row of (data || []) as Setting[]) {
      if (typeof row.value === 'string') {
        settings[row.key] = row.value
      }
    }

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
    if (USE_MOCK_DATA) {
      return NextResponse.json(
        { error: 'API not available in mock data mode' },
        { status: 503 }
      )
    }

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

    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const { data, error } = await supabase
      .from('site_settings')
      .upsert({
        key,
        value: value as string,
        updated_at: new Date().toISOString(),
      } as never)
      .select()
      .single()

    if (error) {
      console.error('Error updating setting:', error)
      return NextResponse.json(
        { error: 'Failed to update setting' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data } as { data: Setting | null })
  } catch (error) {
    console.error('Error in PUT /api/settings:', error)
    return NextResponse.json(
      { error: 'Unauthorized or server error' },
      { status: 401 }
    )
  }
}