import { NextRequest, NextResponse } from 'next/server'
import { createClient, USE_MOCK_DATA } from '@/lib/supabase/server'
import { rateLimitResponse, RATE_LIMITS } from '@/lib/rate-limit'
import type { Database } from '@/types/database'

type Application = Database['public']['Tables']['applications']['Row']

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: NextRequest) {
  // Rate limit: 10 requests per minute per IP
  const rateLimitResponse_1 = rateLimitResponse(request, 'applications', RATE_LIMITS.applications)
  if (rateLimitResponse_1) {
    return rateLimitResponse_1
  }

  try {
    const formData = await request.formData()

    const fullName = formData.get('full_name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const jobId = formData.get('job_id') as string | null
    const portfolioUrl = formData.get('portfolio_url') as string | null
    const message = formData.get('message') as string | null
    const cvFile = formData.get('cv_file') as File | null

    if (!fullName || !email || !phone || !cvFile) {
      return NextResponse.json(
        { error: 'Missing required fields: full_name, email, phone, cv_file' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (!ALLOWED_MIME_TYPES.includes(cvFile.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: PDF, DOC, DOCX' },
        { status: 400 }
      )
    }

    if (cvFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      )
    }

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

    if (jobId) {
      const jobResult = await supabase
        .from('jobs')
        .select('id, status')
        .eq('id', jobId)
        .single()

      const jobData = jobResult.data as { id: string; status: string } | null
      if (!jobData || jobData.status !== 'published') {
        return NextResponse.json(
          { error: 'Invalid or unavailable job' },
          { status: 400 }
        )
      }
    }

    const cvFileName = `${crypto.randomUUID()}-${cvFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('candidate-cvs')
      .upload(cvFileName, cvFile, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      console.error('CV upload error:', uploadError)
      return NextResponse.json(
        { error: 'Failed to upload CV' },
        { status: 500 }
      )
    }

    const now = new Date().toISOString()
    const { data: application, error: insertError } = await supabase
      .from('applications')
      .insert({
        full_name: fullName,
        email,
        phone,
        job_id: jobId || null,
        portfolio_url: portfolioUrl || null,
        message: message || null,
        cv_file_path: uploadData.path,
        cv_file_name: cvFile.name,
        cv_file_size: cvFile.size,
        cv_mime_type: cvFile.type,
        source: jobId ? 'job_apply' : 'direct',
        status: 'new',
        submitted_at: now,
        updated_at: now,
      } as never)
      .select()
      .single()

    if (insertError) {
      console.error('Application insert error:', insertError)
      await supabase.storage.from('candidate-cvs').remove([uploadData.path])
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: application as Application | null }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/applications:', error)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
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

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const jobId = searchParams.get('job_id')

    let query = supabase
      .from('applications')
      .select('*, jobs(title, slug)', { count: 'exact' })
      .order('submitted_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)

    if (status) {
      query = query.eq('status', status)
    }
    if (jobId) {
      query = query.eq('job_id', jobId)
    }

    const { data, count, error } = await query

    if (error) {
      console.error('Error fetching applications:', error)
      return NextResponse.json(
        { error: 'Failed to fetch applications' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data,
      total: count || 0,
      page,
      limit,
    })
  } catch (error) {
    console.error('Error in GET /api/applications:', error)
    return NextResponse.json(
      { error: 'Unauthorized or server error' },
      { status: 401 }
    )
  }
}