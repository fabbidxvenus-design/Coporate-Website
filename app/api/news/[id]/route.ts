import { NextRequest, NextResponse } from 'next/server'
import { createClient, USE_MOCK_DATA } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import type { Database } from '@/types/database'

type Article = Database['public']['Tables']['news_articles']['Row']

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

    const { id } = await params
    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data })
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
    if (USE_MOCK_DATA) {
      return NextResponse.json(
        { error: 'API not available in mock data mode' },
        { status: 503 }
      )
    }

    await requireAdmin()
    const { id } = await params

    const body = await request.json()
    const { title, slug, excerpt, body: articleBody, cover_image_url, category, tags, status } = body

    if (!title || !slug || !articleBody) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, body' },
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

    const { data: existing } = await supabase
      .from('news_articles')
      .select('id')
      .eq('slug', slug)
      .neq('id', id)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Slug already exists. Please use a different slug.' },
        { status: 400 }
      )
    }

    const now = new Date().toISOString()
    const updatePayload: {
      title: string
      slug: string
      excerpt: string | null
      body: string
      cover_image_url: string | null
      category: string | null
      tags: string[]
      status: string
      updated_at: string
      published_at?: string
    } = {
      title,
      slug,
      excerpt: excerpt || null,
      body: articleBody,
      cover_image_url: cover_image_url || null,
      category: category || null,
      tags: tags || [],
      status: status || 'draft',
      updated_at: now,
    }

    if (status === 'published') {
      updatePayload.published_at = now
    }

    const { data, error } = await supabase
      .from('news_articles')
      .update(updatePayload as never)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating article:', error)
      return NextResponse.json(
        { error: 'Failed to update article' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: data as Article | null })
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

    const { error } = await supabase
      .from('news_articles')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting article:', error)
      return NextResponse.json(
        { error: 'Failed to delete article' },
        { status: 500 }
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