import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { applicationsRepository } from '@/lib/repositories'
import fs from 'fs'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdmin()
    const { id } = await params

    const application = await applicationsRepository.findById(id)
    if (!application || !application.cv_path || !fs.existsSync(application.cv_path)) {
      return new NextResponse('File not found', { status: 404 })
    }

    const fileBuffer = fs.readFileSync(application.cv_path)

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': application.cv_mime_type || 'application/pdf',
        'Content-Disposition': `attachment; filename="${application.cv_filename || 'cv.pdf'}"`,
      },
    })
  } catch (error) {
    console.error('Error in GET /api/applications/[id]/cv:', error)
    return new NextResponse('Server error', { status: 500 })
  }
}
