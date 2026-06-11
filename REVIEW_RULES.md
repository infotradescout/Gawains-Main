# Review Rules

## Gawain / Codex / Gemini Loop

```text
Codex checkpoint
→ Gawain opens/checks PR
→ Gawain fetches raw diff/payload
→ Gawain builds Gemini packet with evidence included
→ Gemini reviews
→ Gawain reconciles
→ Codex corrects or merge proceeds
```

## Gemini Evidence Rule

Gemini cannot see GitHub, the repo, PRs, files, commits, or branches unless Gawain supplies the content.

Every Gemini packet must include:

1. Repo
2. PR / branch / commit
3. Baseline SHA
4. Lane name
5. Files changed
6. Validation reported
7. Full raw diff or full changed-file payload
8. Doctrine checklist
9. Specific review questions
10. Required Pass/Fail output

## No Summary-Only Reviews

Do not send Gemini only:

```text
PR link
commit SHA
summary
files changed list
test summary
```

That is not reviewable.

## Accepted Payloads

```bash
git show --stat --patch <commit>
git diff <base>..<head>
git diff main...<branch>
```

Full changed-file contents are acceptable only if they include enough context to verify doctrine and scope.
