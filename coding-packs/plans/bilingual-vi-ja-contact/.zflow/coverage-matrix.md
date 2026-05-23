# Coverage Matrix — bilingual-vi-ja-contact

| TIP-011 Requirement | Phase | Verification |
|---|---|---|
| Support exactly `vi` and `ja` | Phase 02 | Locale helper tests |
| Vietnamese default locale | Phase 02 | Route/helper tests for `/contact` |
| Visible public language switcher | Phase 02, Phase 04 | Header render tests + manual desktop/mobile smoke |
| Localized public nav/footer/CTA/form messages | Phase 02, Phase 04 | Dictionary/render tests |
| Do not localize protected CMS/admin | Phase 01, Phase 02 | Scope review |
| `/contact` and Japanese equivalent route | Phase 02, Phase 04 | Route/render tests |
| Contact fields: name, email, optional phone/company, subject, message, locale | Phase 03, Phase 04 | Validation + form tests |
| Persist contact submissions in Supabase | Phase 03 | Integration/server action tests |
| Reuse site_settings contact metadata where available | Phase 01, Phase 04 | UI data source review |
| Preserve Professional Tech Hub design direction | Phase 04, Phase 05 | Screenshot/manual visual review |
| Server-side validation | Phase 03 | Validation tests |
| Safe localized error handling | Phase 03, Phase 04 | Failure-path tests |
| Anti-abuse boundary | Phase 03 | Rejection test |
| No third-party translation scripts/widgets | Phase 02, Phase 05 | Code review |
| No duplicated hardcoded strings | Phase 02, Phase 05 | Code review/search |
| No client-only or email-only contact flow | Phase 03, Phase 05 | Persistence test/review |
