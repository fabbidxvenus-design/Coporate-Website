import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { applicationsRepository } from '@/lib/repositories'
import { jobsRepository } from '@/lib/repositories'
import path from 'path'
import fs from 'fs'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdmin()
    const { id } = await params

    const application = await applicationsRepository.findById(id)

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    // In local SQLite mode, we don't have "signed URLs".
    // We'll create a simple internal route or just return a path.
    // For now, we point to an API that will serve the file.
    const cvUrl = application.cv_path ? `/api/applications/${id}/cv` : null

    return NextResponse.json({ data: application, cvUrl })
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

    const result = await applicationsRepository.updateStatus(id, status)

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to update application or not found' },
        { status: 404 }
      )
    }

    const updated = await applicationsRepository.findById(id)
    return NextResponse.json({ data: updated })
  } catch (error) {
    console.error('Error in PUT /api/applications/[id]:', error)
    return NextResponse.json(
      { error: 'Unauthorized or server error' },
      { status: 401 }
    )
  }
}
