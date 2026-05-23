# Phase 02 — Localization Foundation

**Mode:** plan-supervised  
**Gate:** RED → GREEN  
**Depends on:** Phase 01

## Goal

Add public Vietnamese/Japanese locale infrastructure with minimal routing disruption and centralized dictionaries.

## RED Gate

Create failing specs/tests for:

1. `vi` and `ja` are the only supported locales.
2. Vietnamese is the default locale.
3. Unsupported locale resolves to the chosen redirect/not-found behavior.
4. Public nav/footer/contact labels resolve from dictionaries.
5. Language switcher maps `/contact` to the Japanese equivalent route and back.

## Execute Steps

1. Add locale constants and helper functions for supported locales.
2. Add centralized dictionary/message modules for public navigation, footer, common CTAs, form labels, validation messages, and contact page copy.
3. Add or adapt route strategy:
   - Keep `/contact` for default Vietnamese.
   - Add Japanese equivalent route, preferably `/ja/contact` unless current routing dictates another pattern.
4. Update public header language switcher to use locale helpers while preserving current placement, dimensions, color, and interaction style.
5. Update public header/footer labels to read from dictionaries without changing layout.

## GREEN Gate

- Locale helper tests pass.
- Header/footer render expected strings in both locales.
- Language switcher links resolve correctly for contact and fallback routes.
- Existing public routes still render.

## Constraints

- Do not add third-party translation widgets.
- Do not scatter string literals across components.
- Do not localize protected CMS/admin UI in this phase.
