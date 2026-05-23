import { NextRequest, NextResponse } from 'next/server'
import { createClient, USE_MOCK_DATA } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import type { Database } from '@/types/database'

type Article = Database['public']['Tables']['news_articles']['Row']

export async function POST(request: NextRequest) {
  try {
    if (USE_MOCK_DATA) {
      return NextResponse.json(
        { error: 'API not available in mock data mode' },
        { status: 503 }
      )
    }

    await requireAdmin()

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
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Slug already exists. Please use a different slug.' },
        { status: 400 }
      )
    }

    const now = new Date().toISOString()
    const { data, error } = await supabase
      .from('news_articles')
      .insert({
        title,
        slug,
        excerpt: excerpt || null,
        body: articleBody,
        cover_image_url: cover_image_url || null,
        category: category || null,
        tags: tags || [],
        status: status || 'draft',
        published_at: status === 'published' ? now : null,
        created_at: now,
        updated_at: now,
      } as never)
      .select()
      .single()

    if (error) {
      console.error('Error creating article:', error)
      return NextResponse.json(
        { error: 'Failed to create article' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: data as Article | null }, { status: 201 })
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
    if (USE_MOCK_DATA) {
      return NextResponse.json(
        { error: 'API not available in mock data mode' },
        { status: 503 }
      )
    }

    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const status = searchParams.get('status')

    let query = supabase
      .from('news_articles')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)

    if (category) {
      query = query.eq('category', category)
    }
    if (status) {
      query = query.eq('status', status)
    }

    const { data, count, error } = await query

    if (error) {
      console.error('Error fetching articles:', error)
      return NextResponse.json(
        { error: 'Failed to fetch articles' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data,
      total: count || 0,
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