# BUTTON-INVENTORY.md

| Surface | File | Selector/text | Current target/handler | Expected mock behavior | Status |
|---|---|---|---|---|---|
| Public Header | `components/layout/PublicHeader.tsx` | Nav links, Language switcher | Routing/Intl | Preserve locale | handled |
| Public Footer | `components/layout/Footer.tsx` | Social links, copyright | Links | Keep valid | handled |
| Public Contact Form | `components/public/ContactForm.tsx` | Submit button | API handler | Success mock | handled |
| Public Job List | `app/[locale]/jobs/page.tsx` | Filter/Sort, Job cards | Filtering, Routing | Mocked list | missing |
| Public Job Detail | `app/[locale]/jobs/[slug]/page.tsx` | Apply button | Navigation | Navigate to Apply | missing |
| Public Apply Form | `app/[locale]/apply/page.tsx` | Submit button | API handler | Success mock | missing |
| Public News List | `app/[locale]/news/page.tsx` | Filter/Sort | Filtering | Mocked list | missing |
| Public News Detail | `app/[locale]/news/[slug]/page.tsx` | Social share/Links | Navigation/Action | Inert/Mock | missing |
| Admin Jobs List | `app/admin/jobs/page.tsx` | Create, Edit, Delete | CRUD Actions | Mock mutation | missing |
| Admin News List | `app/admin/news/page.tsx` | Create, Edit, Delete | CRUD Actions | Mock mutation | missing |
| Admin Applications | `app/admin/applications/page.tsx` | View, Filter | CRUD Actions | Mock mutation | missing |
| Admin Settings | `app/admin/settings/page.tsx` | Save/Submit | Configuration | Success mock | missing |
