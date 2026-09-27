# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are university students in Thailand preparing a CV for internship applications.

## Product Purpose

CV Studio helps people create a resume, academic CV, or portfolio in the browser without an account. Success means completing a polished document with clear guidance and downloading it in a usable format.

## Operating Context

The student internship workflow follows the attached university CV template. It collects student details, education, activities and training, skills, and two references. A Thai transcript is required; an English transcript and certificates are optional attachments. The student CV and attachments are submitted as one PDF.

## Capabilities and Constraints

- Existing resume, academic CV, and portfolio workflows must remain available.
- Drafts are kept locally in the browser; the application has no account or server upload flow.
- The student internship workflow must keep its form data in a separate storage key from existing drafts. PDF attachments must be stored separately from localStorage.
- Existing localStorage data must not be removed or overwritten when adding or resetting the student workflow.
- The university template requests a plain, monochrome CV page with a student photo and no decorative background or graphics. The output may append transcript and certificate PDFs after the CV page.
- The web interface uses a locally bundled Thai-capable font; the generated university PDF uses a separate formal font.
- Do not include personal details from reference documents in examples or source code.

## Evidence on Hand

- The user supplied a university CV template PDF and a sample CV PDF. The sample's personal information is not product data and must stay out of examples and source code.

## Product Principles

- Keep the existing document workflows intact.
- Make the university-specific application flow explicit and easy to complete.
- Keep student records and attachments on the user's device.
- Preserve the university's content and submission requirements.
