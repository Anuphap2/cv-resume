<!-- BEGIN LOCAL AGENT SKILL MANAGER -->
# Project Agent Guide

<!-- Portable entrypoint shared by Codex, Antigravity, and other coding agents. -->

## Working Agreement

- Read the relevant project context and existing repository conventions before changing code.
- Identify the goal, acceptance criteria, assumptions, invariants, risks, and files in scope before implementation.
- Prefer the smallest maintainable change; evaluate complexity, performance, security, compatibility, and technical debt.
- Verify with the project's relevant tests, checks, and build commands. Never claim success without evidence.
- Follow `.agents/project/agent-manager-config.json` for Git commits; when missing or unclear, ask before committing.
- Under `auto`, stage only reviewed task files explicitly (never `git add -A`) and create a local checkpoint commit only after checks pass and baseline changes are excluded.
- Never commit secrets or unresolved failures, and never reset, amend, force-push, or merge automatically.
- Report uncertainty, partial completion, failures, and follow-up debt directly instead of inventing results.
- Respond in natural Thai when the user communicates in Thai, while preserving technical identifiers and commands.

## Shared Agent Assets

- Project context: `.agents/project/project-context.md`
- Architecture decisions: `.agents/project/architecture.md`
- Technical debt register: `.agents/project/technical-debt.md`
- Antigravity custom agents: `.agents/agents/` (use `/agents` in Antigravity CLI; the IDE picker depends on its version).
- Antigravity workspace rules: `.agents/rules/`

## Agent Handoff

- Treat the files under `.agents/` as the project-local source of truth for this workflow.
- Keep project-specific decisions and debt in the project files, not only in chat history.
- Do not overwrite existing user-authored instructions without explicit approval.

<!-- END LOCAL AGENT SKILL MANAGER -->