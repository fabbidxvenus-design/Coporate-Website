# SPEC: Applications and Privacy

## AC-01: Application submission stores through Payload
- Given: a candidate submits an application with valid input
- When: the submission request is processed in non-mock mode
- Then: application metadata is stored through Payload (or documented privacy-safe hybrid path) and the candidate sees the existing success state

## AC-02: Admin auth required for PII
- Given: an unauthenticated request is made to GET `/api/applications/[id]`
- When: the endpoint is invoked
- Then: candidate PII and CV metadata are not returned; unauthenticated access is denied

## AC-03: CV access remains private
- Given: an admin accesses CV files through the application detail endpoint
- When: the request is processed
- Then: the CV remains private and is served only through authenticated server-mediated access; raw storage paths and signed token internals are never exposed to the browser

## AC-04: No CV metadata in public responses
- Given: an application record exists
- When: a public API or page response is generated
- Then: CV filename, CV path, CV mime type, and CV size fields are omitted from the response