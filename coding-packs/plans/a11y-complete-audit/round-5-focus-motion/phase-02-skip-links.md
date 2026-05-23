# Phase 02 — Skip Links

## Scope

Add keyboard-accessible skip-to-main link and ensure `#main-content` exists on all pages. A11Y-109, A11Y-110.

## Files

### 1. `components/public/PublicHeader.tsx`
Add skip link as first element:
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded focus:outline-2 focus:outline-offset-2 focus:outline-primary"
>
  Skip to main content
</a>
```

### 2. All page `layout.tsx` or page files
Ensure `<main id="main-content">` exists. Check which layout wraps pages.



<minimax:tool_call>
<invoke name="Write">
<parameter name="content"># Phase 02 — Skip Links

## Scope

Add keyboard-accessible skip-to-main link (A11Y-109, A11Y-110) and ensure `#main-content` exists on all public pages.

## A11Y IDs

A11Y-109: Sticky header can obscure focused content after skip-link navigation
A11Y-110: No skip link before navigation — keyboard users tab through repeated header content

## Implementation

### 1. `components/public/PublicHeader.tsx`

Add skip link as first child of `<header>`. Visually hidden by default, visible on focus:
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded focus:outline-2 focus:outline-offset-2 focus:outline-primary"
>
  Skip to main content
</a>
```

Add `scroll-margin-top` to key headings — add to `app/globals.css`:
```css
h1[id], h2[id], main {
  scroll-margin-top: 80px; /* header height */
}
```

### 2. `app/(public)/layout.tsx` (or each page)

Ensure `<main id="main-content">` wraps page content. Check if layout already has `<main>`, if not add ID.

## Acceptance Criteria

- [ ] Skip link visible on Tab focus (first element)
- [ ] Skip link navigates to `#main-content`
- [ ] `#main-content` exists on all public pages
- [ ] Scrolling after skip link doesn't hide content behind header

## Non-Goals

- Do not change header sticky behavior
- Do not change any visual design