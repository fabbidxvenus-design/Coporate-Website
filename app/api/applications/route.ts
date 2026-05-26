import { NextRequest, NextResponse } from 'next/server'
import { applicationsRepository } from '@/lib/repositories'
import { jobsRepository } from '@/lib/repositories'
import { rateLimitResponse, RATE_LIMITS } from '@/lib/rate-limit'
import path from 'path'
import fs from 'fs'

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const UPLOAD_DIR = path.join(process.cwd(), '.data/uploads/cv')

export async function POST(request: NextRequest) {
  const rl = rateLimitResponse(request, 'applications', RATE_LIMITS.applications)
  if (rl) return rl

  try {
    const formData = await request.formData()

    const fullName = formData.get('full_name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const jobId = formData.get('job_id') as string | null
    const message = formData.get('message') as string | null
    const cvFile = formData.get('cv_file') as File | null

    if (!fullName || !email || !phone || !cvFile) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!ALLOWED_MIME_TYPES.includes(cvFile.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    if (cvFile.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size exceeds 5MB' }, { status: 400 })
    }

    // Verify job exists
    if (jobId) {
        const jobs = await jobsRepository.findAllPublished()
        const job = jobs.find(j => j.id === jobId)
        if (!job) return NextResponse.json({ error: 'Invalid job' }, { status: 400 })
    }

    // Handle Local File Upload
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true })
    }

    const fileExtension = cvFile.name.split('.').pop()
    const fileName = `${crypto.randomUUID()}.${fileExtension}`
    const filePath = path.join(UPLOAD_DIR, fileName)

    const buffer = Buffer.from(await cvFile.arrayBuffer())
    fs.writeFileSync(filePath, buffer)

    const application = await applicationsRepository.create({
      job_id: jobId || '',
      full_name: fullName,
      email,
      phone,
      message: message || '',
      cv_filename: cvFile.name,
      cv_path: filePath,
      cv_mime_type: cvFile.type,
      cv_size: cvFile.size,
      status: 'pending'
    })

    return NextResponse.json({ data: application }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/applications:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status') as any
    const jobId = searchParams.get('job_id')

    const data = await applicationsRepository.findAll({ status: status || undefined, jobId: jobId || undefined })

    return NextResponse.json({
      data,
      total: data.length,
      page: 1,
      limit: data.length,
    })
  } catch (error) {
    console.error('Error in GET /api/applications:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}