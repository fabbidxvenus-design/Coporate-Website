import DOMPurify from 'dompurify'

function getSanitizer() {
  if (typeof window === 'undefined') {
    // Server-side: use DOMPurify with jsdom
    // This is handled by isomorphic-dompurify which auto-detects environment
    return DOMPurify
  }
  // Client-side: DOMPurify works natively
  return DOMPurify
}

export function sanitizeHtml(html: string): string {
  if (!html) return ''
  return getSanitizer().sanitize(html, {
    ALLOWED_TAGS: ['br', 'p', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  })
}

export function sanitizeAndFormatHtml(html: string): string {
  if (!html) return ''
  return sanitizeHtml(html).replace(/\n/g, '<br/>')
}