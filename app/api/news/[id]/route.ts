import { NextRequest, NextResponse } from 'next/server'
import { newsRepository } from '@/lib/db/repositories/news'
import { requireAdmin } from '@/lib/auth'
import type { NewsArticle } from '@/lib/db/types'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const article = await newsRepository.findById(id)

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: article })
  } catch (error) {
    console.error('Error in GET /api/news/[id]:', error)
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
    const { title, slug, excerpt, content: articleBody, cover_image_url, category, tags, status } = body

    if (!title || !slug || !articleBody) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, body' },
        { status: 400 }
      )
    }

    const existing = await newsRepository.findById(id)
    if (existing && existing.slug === slug && existing.id !== id) {
      return NextResponse.json(
        { error: 'Slug already exists. Please use a different slug.' },
        { status: 400 }
      )
    }

    const updatePayload: Partial<NewsArticle> = {
      title,
      slug,
      excerpt: excerpt || null,
      content: articleBody,
      thumbnail_url: cover_image_url || null,
      tags: tags || [],
      status: (status || 'draft') as NewsArticle['status'],
    }

    const success = await newsRepository.update(id, updatePayload)
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update article' },
        { status: 500 }
      )
    }

    const updated = await newsRepository.findById(id)
    return NextResponse.json({ data: updated })
  } catch (error) {
    console.error('Error in PUT /api/news/[id]:', error)
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

    const success = await newsRepository.delete(id)
    if (!success) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/news/[id]:', error)
    return NextResponse.json(
      { error: 'Unauthorized or server error' },
      { status: 401 }
    )
  }
}