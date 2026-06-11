# Active Work

## TradeScout

Current merged baseline:

```text
5b33c8add8eb5538428cd99a6535198b3072c435
test: lock direct connect kpi funnel events
```

Merged lanes:

```text
Lane A — Public Discovery + Business Entry
Merge commit: 7ac2842d9154604c248aa49c380abfaa83c32da1

Lane B — Direct Connect KPI Funnel Lock
Merge commit: 5b33c8add8eb5538428cd99a6535198b3072c435
```

Active lane:

```text
Lane E — Production Smoke/Freshness Guardrails
Branch: codex/production-smoke-guardrails
Commit: 75c232596c0cfb4b72ac9329155fee6a6bdec50a
Status: pushed locally/remote verified by local git
PR: manual creation required because connector routing is unreliable
```

Required next action:

```text
Open PR manually:
https://github.com/infotradescout/tradescoutAI/compare/main...codex/production-smoke-guardrails?quick_pull=1

Then capture raw diff:
git diff main...codex/production-smoke-guardrails
```

## Other Repos

Add active work summaries as lanes are started.
