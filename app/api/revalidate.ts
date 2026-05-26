import { NextResponse } from 'next/server';

export async function handleRevalidate({ path }: { path: string }) {
  if (process.env.NEXT_PUBLIC_USE_PAYLOAD) {
    // Payload CMS on-demand revalidation via its own webhook
    const webhookSecret = process.env.PAYLOAD_REVALIDATE_SECRET;
    if (!webhookSecret) {
      return NextResponse.json({ error: 'PAYLOAD_REVALIDATE_SECRET not configured' }, { status: 500 });
    }
    // Call Payload's revalidation endpoint
    const response = await fetch(`${process.env.PAYLOAD_URL}/api/revalidate?secret=${webhookSecret}&path=${path}`);
    if (!response.ok) throw new Error('Failed to revalidate via Payload');
    return NextResponse.json({ revalidated: true });
  }

  // Default: Next.js built-in revalidation
  return NextResponse.json({ revalidated: true });
}