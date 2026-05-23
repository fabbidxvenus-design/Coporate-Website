import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation/contact';
import { createServerClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll() {},
        },
      }
    );

    const { data, error } = await supabase
      .from('contact_submissions' as any)
      .insert({
        name: validation.data.name,
        email: validation.data.email,
        phone: validation.data.phone || null,
        company: validation.data.company || null,
        subject: validation.data.subject,
        message: validation.data.message,
        locale: validation.data.locale,
        status: 'new',
        source: 'contact_page',
      } as any)
      .select()
      .single();

    if (error) {
      console.error('[Contact] Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Đã xảy ra lỗi khi lưu dữ liệu.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('[Contact] Unexpected error:', err);
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi. Vui lòng thử lại.' },
      { status: 500 }
    );
  }
}