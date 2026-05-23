import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { rateLimitResponse, RATE_LIMITS } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  // Rate limit: 5 signin attempts per minute per IP
  const rateLimitResponse_1 = rateLimitResponse(request, 'signin', RATE_LIMITS.signin)
  if (rateLimitResponse_1) {
    return rateLimitResponse_1
  }

  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.json(
        { error: 'Authentication service not configured' },
        { status: 503 }
      )
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      )
    }

    // Check if user has admin profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single<{ role: string }>()

    if (!profile || profile.role !== 'admin') {
      await supabase.auth.signOut()
      return NextResponse.json(
        { error: 'You do not have permission to access the CMS. Please contact administrator.' },
        { status: 403 }
      )
    }

    return NextResponse.json({
      success: true,
      user: { id: data.user.id, email: data.user.email },
    })
  } catch (error) {
    console.error('Error in POST /api/auth/signin:', error)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}