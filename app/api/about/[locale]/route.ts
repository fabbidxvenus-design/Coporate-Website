import { NextResponse } from 'next/server'
import { apiError, apiSuccess } from '@/lib/api-response'
import { getAboutContent } from '@/lib/about/get-about-content'
import type { AboutContent } from '@/lib/about/types'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> }
): Promise<NextResponse> {
  try {
    const { locale } = await params
    const content = await getAboutContent(locale)
    
    return NextResponse.json(apiSuccess<AboutContent>(content))
  } catch (error) {
    console.error('API_ABOUT_ERROR:', error)
    return NextResponse.json(
      apiError('ABOUT_CONTENT_ERROR', 'Unable to load about page content.'),
      { status: 500 }
    )
  }
}
