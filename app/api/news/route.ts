import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { newsRepository } from '@/lib/repositories'

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()

    const body = await request.json()
    const { title, slug, excerpt, body: articleBody, cover_image_url, category, tags, status } = body

    if (!title || !slug || !articleBody) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, body' },
        { status: 400 }
      )
    }

    const existing = await newsRepository.findBySlug(slug)
    if (existing) {
      return NextResponse.json(
        { error: 'Slug already exists. Please use a different slug.' },
        { status: 400 }
      )
    }

    const article = await newsRepository.create({
      title,
      slug,
      content: articleBody,
      excerpt: excerpt || '',
      thumbnail_url: cover_image_url,
      content_images: [],
      author_name: 'Admin',
      author_role: null,
      tags: tags || [],
      status: status || 'draft',
      views: 0,
      published_at: null,
    })

    return NextResponse.json({ data: article }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/news:', error)
    return NextResponse.json(
      { error: 'Unauthorized or server error' },
      { status: 401 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await requireAdmin()

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const articles = await newsRepository.findAll()
    const offset = (page - 1) * limit

    const rows = articles.slice(offset, offset + limit)
    const total = articles.length

    return NextResponse.json({
      data: rows,
      total,
      page,
      limit,
    })
  } catch (error) {
    console.error('Error in GET /api/news:', error)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}