# Phase 01 — Intake and Current State

**Mode:** plan-supervised  
**Gate:** SPEC readiness  
**Depends on:** TIP-011 and existing implementation state

## Goal

Map the current application structure before changing routing or data flow. Confirm where public routes, shared components, Supabase clients, migrations, validation utilities, and tests live.

## Steps

1. Read `coding-packs/tips/TIP-011-bilingual-vi-ja-contact.md` and `specs/spec-bilingual-contact.md`.
2. Inspect current app folders and route groups.
3. Identify public layout/header/footer components and any existing language switcher markup.
4. Identify existing Supabase server client, migration conventions, RLS patterns, and `site_settings` access patterns.
5. Identify validation utilities and anti-abuse patterns from application/contact-like forms.
6. Identify test framework and existing route/form test patterns.
7. Record exact target files in `.zflow/state.json` before implementation begins.

## Deliverables

- `.zflow/state.json` updated with discovered file paths and chosen locale route strategy.
- No production code changes in this phase unless only adding missing plan metadata.

## Acceptance Gate

- The implementer can state exactly where locale dictionaries, contact page, validation schema, persistence action/handler, and tests will be added.
- If current app is missing a required foundation from TIP dependencies, stop and report blocker instead of inventing parallel architecture.

## Risks to Check

- Existing public route structure may not support route-prefix localization cleanly.
- Supabase migrations may not exist yet despite TIP dependencies.
- Existing header/footer may contain hardcoded text that must be localized without visual drift.
