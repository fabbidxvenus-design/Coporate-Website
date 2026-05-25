import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validation/contact'
import { contactRepository } from '@/lib/db/repositories/contact'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = contactSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const submission = await contactRepository.create({
      name: validation.data.name,
      email: validation.data.email,
      phone: validation.data.phone || '',
      company: validation.data.company || '',
      message: validation.data.message,
      status: 'new'
    })

    return NextResponse.json({ success: true, data: submission })
  } catch (err) {
    console.error('[Contact] Unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi. Vui lòng thử lại.' },
      { status: 500 }
    )
  }
}