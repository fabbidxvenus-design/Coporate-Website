import sanitize from 'sanitize-html'

export function sanitizeHtml(html: string): string {
  if (!html) return ''

  return sanitize(html, {
    allowedTags: ['br', 'p', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowProtocolRelative: false,
    transformTags: {
      a: sanitize.simpleTransform('a', { rel: 'noopener noreferrer' }, true),
    },
  })
}

export function sanitizeAndFormatHtml(html: string): string {
  if (!html) return ''
  return sanitizeHtml(html.replace(/\n/g, '<br/>'))
}
