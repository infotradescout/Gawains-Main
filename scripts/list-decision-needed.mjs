#!/usr/bin/env node
import { collectLanes } from './update-lane-board.mjs';

const lanes = (await collectLanes())
  .filter((lane) => lane.state === 'needs_thomas_decision' || lane.state === 'needs_gawain_review' || lane.decisionNeeded);

for (const lane of lanes) {
  console.log(`${lane.laneId}\t${lane.repoKey}\t${lane.laneName}\tdecision=${lane.decisionNeeded || lane.nextAction || 'Review required'}\tblocker=${lane.blocker || 'none'}\tnext=${lane.nextAction || 'TBD'}`);
}
