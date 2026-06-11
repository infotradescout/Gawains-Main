#!/usr/bin/env node
import { collectLanes, mergeReady } from './update-lane-board.mjs';

const lanes = (await collectLanes()).filter(mergeReady);

for (const lane of lanes) {
  console.log(`${lane.laneId}\t${lane.repoKey}\t${lane.laneName}\t${lane.branch}\tready`);
}
