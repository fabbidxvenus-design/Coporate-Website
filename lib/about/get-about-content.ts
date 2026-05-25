import { mockAboutData } from './mock-data'
import type { AboutContent } from './types'

type SupportedLocale = keyof typeof mockAboutData

function normalizeLocale(locale?: string | null): SupportedLocale {
  return locale === 'ja' ? 'ja' : 'vi'
}

export async function getAboutContent(locale?: string | null): Promise<AboutContent> {
  const normalizedLocale = normalizeLocale(locale)
  return mockAboutData[normalizedLocale]
}
