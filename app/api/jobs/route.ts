import { NextRequest, NextResponse } from 'next/server'
import { jobsRepository } from '@/lib/repositories'
import { requireAdmin } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()

    const body = await request.json()
    const {
        title, slug, description, requirements, benefits, salary_min, salary_max,
        location, employment_type, skills, tags, status, department, currency, summary, closed_at, image
    } = body

    if (!title || !slug) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug' },
        { status: 400 }
      )
    }

    const job = await jobsRepository.create({
      title,
      slug,
      description: description || '',
      requirements: requirements || '',
      benefits: benefits || '',
      salary_min: salary_min || null,
      salary_max: salary_max || null,
      location: location || '',
      employment_type: employment_type || null,
      skills: skills || [],
      tags: tags || [],
      status: status || 'draft',
      department: department || null,
      currency: currency || 'VND',
      summary: summary || null,
      closed_at: closed_at || null,
      image: image || null,
      views: 0,
      published_at: null,
      created_by: null,
      updated_by: null
    })

    return NextResponse.json({ data: job }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/jobs:', error)
    return NextResponse.json(
      { error: 'Unauthorized or server error' },
      { status: 401 }
    )
  }
}
