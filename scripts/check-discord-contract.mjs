#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const contractPath = path.join(root, 'docs', 'ROUNDTABLE_DISCORD_PACKET_AUTHORITY_CONTRACT.md');
const templatePath = path.join(root, 'templates', 'ROUNDTABLE_DISCORD_PACKET.template.json');

const contract = fs.readFileSync(contractPath, 'utf8');
const template = JSON.parse(fs.readFileSync(templatePath, 'utf8'));

const requiredContractText = [
  'RoundTable owns the Discord packet doctrine',
  'Merlin owns Discord webhook dispatch',
  'approvalStatus',
  'approvedBy',
  'Discord reactions are not approval',
  'verified approval record',
  'noExecutionPerformed',
  'RoundTable must not contain',
  'Live Discord send by RoundTable'
];

const requiredTemplateKeys = [
  'packetId',
  'packetType',
  'createdAt',
  'sourceRepo',
  'sourceBranch',
  'sourceCommit',
  'lane',
  'title',
  'summary',
  'requestedAction',
  'approvedActionScopes',
  'authorityRequired',
  'delivery',
  'evidence',
  'doctrineRefs',
  'terminalRecordRequired',
  'noExecutionAuthorized'
];

const missingText = requiredContractText.filter((needle) => !contract.includes(needle));
const missingKeys = requiredTemplateKeys.filter((key) => !(key in template));

if (missingText.length || missingKeys.length) {
  if (missingText.length) console.error(`Missing contract text: ${missingText.join(', ')}`);
  if (missingKeys.length) console.error(`Missing template keys: ${missingKeys.join(', ')}`);
  process.exitCode = 1;
} else {
  console.log('RoundTable Discord contract and packet template checks passed.');
}
