# Parent Routing Packet

Created: 2026-06-12T13:39:54.7786448-05:00
Packet: roundtable/parent-routing-packet-runtime-storage-split
Repo: RoundTable
Branch: codex/universal-existing-state-workflow-law
Baseline SHA: 81d5f0ea44299ac3c8d04cfc0dcaa683314ce7a5

## Parent Decision

RoundTable is dispatcher and ledger only.

RoundTable owns parent routing packets, terminal Git state records, markdown/frontmatter packet schema expectations, repository boundary matrix, mechanical safety doctrine, Existing-State Law, parent/child routing doctrine, and time-freshness laws.

RoundTable owns zero execution runtime.

## Doctrine Lock

Do not implement runtime, storage, bot, adapter, or product behavior in RoundTable.

Forbidden in this parent lane:

- SQLite schemas
- Discord bot or API code
- runtime execution
- ephemeral workflow transition storage
- Drive or Apps Script adapters
- Merlin runtime or transport implementation
- MealScout storage implementation
- TradeScout, MealScout, Sway, AutoBott, or other product repo behavior
- Albion governance math unless explicitly routed through Albion

## Child Lanes

### 1. Merlin Runtime Child

Repo: merlin-os-action-layer

Scope:

- runtime and ephemeral workflow state
- SQLite only if existing-state deep dive confirms ownership and fit
- Discord Bridge API only if existing-state deep dive confirms ownership and fit
- hardened approval verification

Required first action:

- Existing-state deep dive in `merlin-os-action-layer`
- Identify current runtime, approval, Discord, and storage ownership before changing files
- Confirm no product repo behavior is altered

### 2. MealScout / Merlin Storage Child

Repo: MealScout or merlin-os-action-layer, depending on existing storage ownership

Scope:

- Drive adapters
- Apps Script adapters
- storage adapter boundaries
- storage ownership map

Required first action:

- Existing-state deep dive across the likely storage owner
- Determine whether storage adapter ownership belongs in MealScout or Merlin before implementation
- Do not add storage code until ownership is proven

### 3. Product Village Child Lanes

Repos: TradeScout, MealScout, Sway, AutoBott, or other product repo as applicable

Scope:

- product behavior only when the product itself changes
- UI, product-specific AI integration, product workflows, and product data behavior remain repo-owned

Required first action:

- Create repo-specific child lane only when product behavior changes
- Confirm target repo boundary before implementation
- Do not route product behavior through RoundTable

## Terminal State Expectations

Every child lane must return:

- repo
- branch
- baseline SHA
- final commit SHA
- files changed
- existing-state findings
- ownership finding
- validation commands/results
- runtime behavior changed: yes/no
- product behavior changed: yes/no
- final git status
- merge readiness
- known concerns

## Freshness Rule

Child lanes must re-check source of truth before implementation, validation claim, commit claim, PR claim, merge, apply, send, close, or completion claim.

