# SPEC: Payload Collections

## AC-01: Payload jobs collection configured
- Given: Payload config file
- When: Payload initializes collections
- Then: Jobs collection exists with fields: slug, title (i18n), department (i18n), location (i18n), employment_type (i18n), salary_range (i18n), skills, description (i18n), requirements (i18n), benefits (i18n), status, published_at, image

## AC-02: Payload articles collection configured
- Given: Payload config file
- When: Payload initializes collections
- Then: Articles/news collection exists with fields: slug, title (i18n), excerpt (i18n), body (i18n), cover_image, content_images, category, tags, status, author (i18n), published_at

## AC-03: Payload applications collection configured
- Given: Payload config file
- When: Payload initializes collections
- Then: Applications collection exists with fields: job_id, full_name, email, phone, portfolio_url, message, status

## AC-04: Payload media collection configured
- Given: Payload config file
- When: Payload initializes collections
- Then: Media collection exists with file upload limits, image sizes, and alt text field

## AC-05: Payload site-settings singleton configured
- Given: Payload config file
- When: Payload initializes collections
- Then: Site-settings singleton collection exists with companyName, slogan, founded, representative, headcount, contactEmail, contactPhone, socialLinks, offices

## AC-06: Payload about-pages collection configured
- Given: Payload config file
- When: Payload initializes collections
- Then: About-pages collection exists with locale, heroTitle (i18n), heroSubtitle (i18n), heroImage, visionTitle, visionContent (i18n), missionTitle, missionContent (i18n), valuesTitle, values[], teamTitle, teamMembers[], stats[]

## AC-07: Payload access control configured
- Given: Payload collections
- When: Public read requests are made
- Then: Jobs/articles publicly readable only when status is published; applications are admin-only for read; media is configurable for public read; settings are admin-only