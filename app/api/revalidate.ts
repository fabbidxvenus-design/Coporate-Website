import { NextResponse } from 'next/server';
import { getStrapiConfig } from '@/lib/strapi/config';

export async function handleRevalidate({ path }: { path: string }) {
  const config = getStrapiConfig();
  // Simulate Strapi call
  const response = await fetch(`${config.url}/api/revalidate?path=${path}`, {
    headers: { Authorization: `Bearer ${config.token}` },
  });
  if (!response.ok) throw new Error('Failed to revalidate');
  return NextResponse.json({ revalidated: true });
}
