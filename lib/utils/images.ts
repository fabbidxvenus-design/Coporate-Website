/**
 * Normalizes an image path to a public local URL.
 * Handles bare filenames, already prefixed paths, and prevents double-prefixing.
 * Reject or returns null for remote URLs in mock-mode corporate imagery.
 */
export function normalizeLocalImage(pathOrFilename: string | null | undefined): string | null {
  if (!pathOrFilename) return null;

  // If it's already a full URL (remote), return null in mock mode to force local use
  if (pathOrFilename.startsWith('http')) {
    return null;
  }

  // Remove locale prefix if present (e.g., "/vi/images/...")
  let normalizedPath = pathOrFilename;
  if (normalizedPath.startsWith('/vi/') || normalizedPath.startsWith('/ja/')) {
    normalizedPath = normalizedPath.substring(3);
  }

  // If already prefixed with /images/
  if (normalizedPath.startsWith('/images/')) {
    return normalizedPath;
  }

  // If starts with /, assume it's a relative path from public root
  if (normalizedPath.startsWith('/')) {
    return `/images${normalizedPath}`;
  }

  // Bare filename
  return `/images/${normalizedPath}`;
}
