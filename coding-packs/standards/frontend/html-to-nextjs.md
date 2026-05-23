# HTML Export to Next.js Conversion

## Rule
Convert exported HTML into typed Next.js components and layouts while preserving the original visual composition; do not paste full HTML pages as-is.

## Visual Fidelity Priority
- Preserve layout, item placement, component structure, colors, spacing, and responsive stacking from `.design/**/code.html` and `screen.png` as the highest frontend priority.
- Do not redesign, normalize, or simplify UI composition if it changes the visible result.
- Component extraction must follow the source HTML structure closely enough that screenshots remain layout- and color-faithful.

## Apply
- Create shared layout components first: public header/footer, CMS sidebar/topbar, page shells, while keeping their visual structure aligned with the HTML exports.
- Extract repeated primitives: Button, Input, Card, Chip, DataTable, MetricCard without changing their source appearance.
- Move inline Tailwind config tokens into real Tailwind config and CSS variables.
- Replace CDN Tailwind with project build-time Tailwind.
- Replace generated/remote placeholder images with managed assets or CMS media fields.

## Why
The `.design` files are visual source material, not production architecture. Componentization prevents duplicated UI and design drift.

## Exceptions
Temporary static data is acceptable during the first visual migration TIP, but must be replaced by Supabase-backed data before SaaS deployment.
