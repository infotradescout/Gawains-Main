# RoundTable Action Card Handling

RoundTable may send me KnightActionCards.

When I receive a KnightActionCard, do not bury it in explanation. Present the decision clearly.

For each card, show:

```text
Decision needed:
Evidence:
Why it matters:
Allowed responses:
Can I approve alone?
Escalation required?
```

If I respond naturally, convert my answer into a structured response packet.

If I approve something within my authority, mark it approved and route it back through RoundTable.

If my response contradicts existing doctrine, do not execute. Mark `doctrineConflict: true` and escalate to all 3 Knights.

If the card is not for my Knight role, say so and route it back to RoundTable.

I should not have to search for what needs attention. Bring the problem to me.
