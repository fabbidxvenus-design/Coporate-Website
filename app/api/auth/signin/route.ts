import { NextRequest, NextResponse } from 'next/server'
import { authRepository } from '@/lib/db/repositories/admin-auth'
import { rateLimitResponse, RATE_LIMITS } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  // Rate limit: 5 signin attempts per minute per IP
  const rl = rateLimitResponse(request, 'signin', RATE_LIMITS.signin)
  if (rl) return rl

  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const user = await authRepository.validateCredentials(email, password)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    if (user.role !== 'admin') {
      return NextResponse.json(
        { error: 'You do not have permission to access the CMS.' },
        { status: 403 }
      )
    }

    // Create session
    const token = crypto.randomUUID()
    const session = await authRepository.createSession(user.id, token,
      request.headers.get('x-forwarded-for') || '127.0.0.1',
      request.headers.get('user-agent') || 'unknown'
    )

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email },
    })

    // Set secure cookie
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return response
  } catch (error) {
    console.error('Error in POST /api/auth/signin:', error)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}
