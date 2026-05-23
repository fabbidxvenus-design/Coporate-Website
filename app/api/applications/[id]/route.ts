import { NextRequest, NextResponse } from 'next/server'
import { createClient, USE_MOCK_DATA } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import type { Database } from '@/types/database'

type Application = Database['public']['Tables']['applications']['Row']

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    if (USE_MOCK_DATA) {
      return NextResponse.json(
        { error: 'API not available in mock data mode' },
        { status: 503 }
      )
    }

    await requireAdmin()
    const { id } = await params
    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const { data, error } = await supabase
      .from('applications')
      .select('*, jobs(id, title, slug)')
      .eq('id', id)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    const appData = data as Application
    let cvUrl: string | null = null
    if (appData.cv_file_path) {
      const urlResult = await supabase.storage
        .from('candidate-cvs')
        .createSignedUrl(appData.cv_file_path, 3600)

      cvUrl = urlResult.data?.signedUrl || null
    }

    return NextResponse.json({ data: appData, cvUrl })
  } catch (error) {
    console.error('Error in GET /api/applications/[id]:', error)
    return NextResponse.json(
      { error: 'Unauthorized or server error' },
      { status: 401 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    if (USE_MOCK_DATA) {
      return NextResponse.json(
        { error: 'API not available in mock data mode' },
        { status: 503 }
      )
    }

    await requireAdmin()
    const { id } = await params

    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      )
    }

    const validStatuses = ['new', 'reviewing', 'shortlisted', 'rejected', 'hired']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
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
      .from('applications')
      .update({
        status,
        updated_at: new Date().toISOString(),
      } as never)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating application:', error)
      return NextResponse.json(
        { error: 'Failed to update application' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: data as Application | null })
  } catch (error) {
    console.error('Error in PUT /api/applications/[id]:', error)
    return NextResponse.json(
      { error: 'Unauthorized or server error' },
      { status: 401 }
    )
  }
}