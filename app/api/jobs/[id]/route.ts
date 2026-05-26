import { NextRequest, NextResponse } from 'next/server'
import { jobsRepository } from '@/lib/db/repositories/jobs'
import { requireAdmin } from '@/lib/auth'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const job = await jobsRepository.findById(id)

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: job })
  } catch (error) {
    console.error('Error in GET /api/jobs/[id]:', error)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdmin()
    const { id } = await params
    const body = await request.json()

    const success = await jobsRepository.update(id, body)
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update job' },
        { status: 500 }
      )
    }

    const updated = await jobsRepository.findById(id)
    return NextResponse.json({ data: updated })
  } catch (error) {
    console.error('Error in PUT /api/jobs/[id]:', error)
    return NextResponse.json(
      { error: 'Unauthorized or server error' },
      { status: 401 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdmin()
    const { id } = await params

    const success = await jobsRepository.delete(id)
    if (!success) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/jobs/[id]:', error)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}
