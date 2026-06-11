#!/usr/bin/env node
import { collectLanes } from './update-lane-board.mjs';
import { parseArgs } from './repo-registry.mjs';

const args = parseArgs();
const lanes = (await collectLanes())
  .filter((lane) => !args['repo-key'] || lane.repoKey === args['repo-key'])
  .filter((lane) => !args.state || lane.state === args.state);

for (const lane of lanes) {
  console.log(`${lane.laneId}\t${lane.repoKey}\t${lane.state}\t${lane.laneName}\t${lane.nextAction || 'TBD'}\t${lane.owner || 'TBD'}`);
}
