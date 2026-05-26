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
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')

    const { isSqliteDataMode } = await import('@/lib/config/data-source')
    if (!isSqliteDataMode()) {
      return NextResponse.json(
        { error: 'Admin listing requires USE_MOCK_DATA=false (SQLite mode)' },
        { status: 403 }
      )
    }
    const { getDb } = await import('@/lib/db/connection')
    const db = getDb()
    const offset = (page - 1) * limit

    let sql = 'SELECT * FROM news_articles'
    const values: any[] = []

    if (status) {
      sql += ' WHERE status = ?'
      values.push(status)
    }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'
    values.push(limit, offset)

    const rows = db.prepare(sql).all(...values) as any[]

    // Get total count
    let countSql = 'SELECT COUNT(*) as count FROM news_articles'
    if (status) {
      countSql += ' WHERE status = ?'
    }
    const countResult = db.prepare(countSql).get(...(status ? [status] : [])) as any
    const total = countResult?.count || 0

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