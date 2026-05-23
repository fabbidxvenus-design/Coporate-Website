# Coporate_Website Coding Packs — Vibecode Kit v5.0

> AI Quality Command Center — Coding Packs for Coporate_Website
> Generated from Vibecode Kit v5.0 framework

## How to Use

### Power Triangle

```text
CON NGUOI (Chu nha)          ← You: Approve, decide, relay
      |
  ----+----
  |        |
CLAUDE CHAT               CLAUDE CODE
(Chu thau)                (Tho thi cong)
Design, interview         Implement TIPs
Orchestrate               Self-test, report
```

### Workflow

1. Read `00-PROJECT-CONTEXT.md` — Scan + Vision.
2. Read `01-REQUIREMENTS-MATRIX.md` — RRI requirements and decisions.
3. Read `BUILDER-HANDOFF.md` — Builder rules and architecture.
4. Read `02-TASK-GRAPH.md` — TIP dependencies and execution order.
5. Generate a TIP with `/vibecode:tip [task]`.
6. Paste `BUILDER-HANDOFF.md` + the selected TIP into Claude Code for implementation.
7. Builder returns Completion Report; verify before continuing.

## File Structure

```text
coding-packs/
├── README.md
├── 00-PROJECT-CONTEXT.md
├── 01-REQUIREMENTS-MATRIX.md
├── 02-TASK-GRAPH.md
├── BUILDER-HANDOFF.md
├── product/
│   ├── mission.md
│   ├── roadmap.md
│   └── tech-stack.md
├── standards/
│   ├── README.md
│   ├── cms/admin-shell.md
│   ├── database/supabase-saas.md
│   ├── domain/recruitment-content.md
│   ├── frontend/html-to-nextjs.md
│   └── ui/design-tokens.md
├── research/
├── plans/
├── reports/
└── tips/
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js App Router |
| Language | TypeScript |
| Styling | Tailwind CSS with project-owned design tokens |
| Backend | Next.js Route Handlers / Server Actions |
| Database | Supabase Postgres |
| Auth | Supabase Auth for CMS/admin users |
| Storage | Supabase Storage for private CV/media files |
| Deployment | Vercel + Supabase |

## TIP Execution Order

| Order | TIP | Name | Week |
|-------|-----|------|------|
| 1 | TIP-001 | Project scaffold, tooling, Tailwind tokens, base layouts | 1 |
| 2 | TIP-002 | Supabase schema, RLS, storage, seed data | 1 |
| 3 | TIP-003 | Supabase auth, middleware, admin guard, login | 1 |
| 4 | TIP-004 | Public layout, homepage, about page from `.design` | 2 |
| 5 | TIP-005 | Jobs public pages + jobs CMS workflow | 2 |
| 6 | TIP-006 | Application form, CV upload, applications CMS | 2 |
| 7 | TIP-007 | News public pages + rich text news CMS | 3 |
| 8 | TIP-008 | CMS dashboard metrics + settings | 3 |
| 9 | TIP-009 | QA, tests, accessibility, responsive verification | 3 |
| 10 | TIP-010 | Deployment readiness, env docs, final verification | 3 |

## Source Documents

- Scan + Vision: `00-PROJECT-CONTEXT.md`
- Requirements: `01-REQUIREMENTS-MATRIX.md`
- Builder Handoff: `BUILDER-HANDOFF.md`
- Task Graph: `02-TASK-GRAPH.md`
- Product docs: `product/mission.md`, `product/roadmap.md`, `product/tech-stack.md`
- Standards: `standards/README.md`

---

*Updated: 2026-05-22 | Framework: Vibecode Kit v5.0 | Project: Coporate_Website*
