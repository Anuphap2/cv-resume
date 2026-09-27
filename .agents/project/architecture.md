# Architecture Notes

<!-- Keep this document short and factual. Record decisions, not guesses. -->

## System Boundaries

- Primary components: React/Vite single-page app; independent `FormWizard` and `StudentInternshipWizard` flows; React PDF renderer for generated CV pages.
- External systems:
- Data ownership: Resume, CV, and portfolio drafts use separate localStorage keys. Resume and CV keep independent Thai and English content versions; legacy single-document drafts migrate to their matching key, with old resume/CV data copied into both versions when needed. Student internship form uses `cv-resume-student-internship-draft-v1`. Student transcript/certificate PDF blobs use IndexedDB database `cv-resume-student-attachments-v1`.
- Critical interfaces: Student export generates a one-page CV, then uses pdf-lib to append Thai transcript, optional English transcript, and certificates in that order.

## Invariants and Constraints

- Resetting the student internship workflow must never remove or overwrite the existing resume/CV/portfolio draft key.
- UI font assets are bundled locally. PDF typography is kept independent from the web UI font.

## Architecture Decisions

| Decision | Context | Trade-off | Consequence | Date |
| --- | --- | --- | --- | --- |
| Keep internship data in a separate localStorage key and PDF blobs in IndexedDB | Preserve existing user drafts and avoid placing large files in localStorage | Separate persistence layers require handling missing or unavailable attachment records | Existing drafts remain isolated; exports validate attachment availability | 2026-09-26 |
| Bundle Anuphan for the web UI and Sarabun for PDF output | Thai UI readability and university-form document typography have separate needs | Two font families add assets and license files | Font roles are explicit and each family is self-hosted | 2026-09-26 |
| Keep Thai and English resume/CV content in independent versions | Users need localized documents without automatic translation overwriting original wording | Content must be translated or entered separately by the user | The active version controls preview and PDF language while existing single-version drafts seed both versions | 2026-09-27 |

## Change Guidance

- Update this document when a change affects boundaries, data flow, public contracts, scale assumptions, or operational behavior.
- Do not fill unknown facts by guessing; mark them as `Unknown` and verify them from the repository or owner.
