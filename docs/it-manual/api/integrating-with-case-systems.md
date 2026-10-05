# Integrating with a case management system or CRM

Many jurisdictions process applications in a case management system or CRM after residents submit them in CiviForm. CiviForm has no outbound call at submission; the other system reads applications through the [List applications endpoint](program-applications.md) on a schedule. This page describes a design that works with that endpoint's behavior. Adapt it to your platform; the mechanics are the same in Salesforce, ServiceNow, MuleSoft or a scheduled script.

## Poll with a watermark

Keep the newest `submit_time` you have seen. On each run request applications with `fromDate` set to that watermark minus a short overlap (for example 15 minutes) and `revisionState=CURRENT`, then follow `nextPageToken` until it is `null`. The overlap absorbs clock differences and submissions in flight; the identity rule below makes re-reading harmless. Advance the watermark only after the run completes, so a failed run re-reads on the next attempt.

Repeat `revisionState=CURRENT` on every page request. The dates and page size travel inside the token; `revisionState` does not (see [Pagination](program-applications.md#pagination)).

## Identity

Key a case on `program_name` and `applicant_id` together. Key a revision on `application_id`.

When an applicant edits and resubmits, CiviForm marks the earlier application `OBSOLETE` and creates a new one with a new `application_id` as `CURRENT`, for the same applicant and program. Upsert the case on its key and attach each application as a revision on `application_id`. Seeing the same `application_id` twice is a no-op unless its status fields changed. Store `application_id` on the target record as an external ID so the upsert is idempotent.

## Status

`status`, `status_last_modified_time` and `application_note` reflect the program admin's latest action in CiviForm at the time of the request. The endpoint filters on submission time, so a status set after submission is only observed by reading that application again. Two workable arrangements:

- The case system owns status after hand-off. Program admins stop setting statuses in CiviForm for programs that are handed off. There is no API for writing status back to CiviForm.
- A second, slower job re-reads the last several weeks of `CURRENT` applications and updates status where `status_last_modified_time` moved.

## Files

File upload answers contain `file_urls`, links to the admin file viewer on the CiviForm deployment. Those links require an admin browser session; they cannot be fetched with an API key. Carry them as text if useful.

## Applicant data

Every response contains applicant personal information. Create the API key with a READ grant on the one program you need, a subnet allowlist limited to the integration platform's outbound addresses, and an expiration. Rotate on a schedule and log each run on your side: run time, program, pages, rows, watermark before and after. See [Authentication](authentication.md) and [Manage API keys](../../user-manual/civiform-admin-guide/manage-api-keys.md).

## Failures

- `401`: the key, its allowlist or its expiration. Stop and alert; retrying will not help.
- `400` while following a token: the request changed mid-run. Stop and start the next run from the watermark.
- `5xx` or a timeout: retry the page with backoff. If the run cannot finish, leave the watermark where it was.

## Mapping answers

Answers are keyed by the question's admin name and carry a `question_type` and the fields for that type, described under [Application object](program-applications.md#application-object). Decide per question which target field it fills; anything not mapped can be kept as the answer object's JSON text. Enumerator answers are nested; flatten them into child records or JSON as your system prefers.
