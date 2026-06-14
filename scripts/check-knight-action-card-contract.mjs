#!/usr/bin/env node
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from './repo-registry.mjs';

const contractPath = path.join(ROOT, 'docs', 'KNIGHT_ACTION_CARD_CONTRACT.md');
const schemaPath = path.join(ROOT, 'roundtable', 'schemas', 'knight-action-card.schema.json');
const templatePath = path.join(ROOT, 'templates', 'KNIGHT_ACTION_CARD.template.json');
const examplesDir = path.join(ROOT, 'roundtable', 'examples', 'knight-action-cards');

const allowedKnightHumans = {
  Gawain: 'Thomas',
  Lancelot: 'Levon',
  Percival: 'Dylan',
  all_three: 'all_three'
};

const allowedPriorities = new Set(['P0', 'P1', 'P2', 'P3']);
const requiredFields = [
  'packetId',
  'packetType',
  'createdAt',
  'sourceSystem',
  'sourceAgent',
  'targetSystem',
  'targetKnight',
  'targetHuman',
  'priority',
  'problemType',
  'entityRef',
  'summary',
  'whyThisMatters',
  'requestedAction',
  'allowedResponses',
  'evidence',
  'blockedBy',
  'productionApplied',
  'requiresThreeKnightEscalation',
  'doctrineConflict',
  'routingReason',
  'noExecutionClaim'
];

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertRequiredFields(card, label) {
  for (const field of requiredFields) {
    assert(Object.prototype.hasOwnProperty.call(card, field), `${label} missing ${field}`);
  }
}

function validateActionCard(card, label) {
  assertRequiredFields(card, label);
  assert(card.packetType === 'knight_action_card', `${label} packetType must be knight_action_card`);
  assert(
    Object.prototype.hasOwnProperty.call(allowedKnightHumans, card.targetKnight),
    `${label} must target one Knight or all_three`
  );
  assert(
    card.targetHuman === allowedKnightHumans[card.targetKnight],
    `${label} targetHuman must match targetKnight`
  );
  assert(allowedPriorities.has(card.priority), `${label} has invalid priority`);
  assert(card.productionApplied === false, `${label} productionApplied must default/remain false`);
  assert(card.noExecutionClaim === true, `${label} must set noExecutionClaim true`);
  assert(!('executionResult' in card), `${label} must not claim executionResult`);
  assert(!('executedAt' in card), `${label} must not claim executedAt`);
  assert(Array.isArray(card.allowedResponses) && card.allowedResponses.length > 0, `${label} needs allowedResponses`);
  assert(card.entityRef && typeof card.entityRef === 'object', `${label} needs entityRef`);
  assert(
    Array.isArray(card.entityRef.sourceArtifactRefs) && card.entityRef.sourceArtifactRefs.length > 0,
    `${label} entityRef.sourceArtifactRefs is required`
  );
  if (card.priority === 'P0' || card.priority === 'P1') {
    assert(Array.isArray(card.evidence) && card.evidence.length > 0, `${label} P0/P1 cards require evidence`);
  }
  for (const item of card.evidence ?? []) {
    assert(item.sourceArtifactRef, `${label} evidence items require sourceArtifactRef`);
  }
  if (card.sourceSystem === 'MealScout') {
    assert(
      card.entityRef.profileRef || card.entityRef.sourceArtifactRefs.length > 0,
      `${label} MealScout cards must preserve profile or source artifact references`
    );
  }
  if (card.doctrineConflict === true) {
    assert(card.targetKnight === 'all_three', `${label} doctrineConflict requires all_three targetKnight`);
    assert(card.targetHuman === 'all_three', `${label} doctrineConflict requires all_three targetHuman`);
    assert(
      card.requiresThreeKnightEscalation === true,
      `${label} doctrineConflict requiresThreeKnightEscalation true`
    );
  }
}

const contract = readFileSync(contractPath, 'utf8');
const schema = readJson(schemaPath);
const template = readJson(templatePath);

const requiredContractText = [
  'RoundTable owns KnightActionCard doctrine',
  'Merlin owns detector jobs, extraction, classification, normalization',
  'Product systems such as MealScout, TradeScout, Sway, Albion, and AutoBott execute only through their approved safe paths',
  'Thomas/Gawain, Dylan/Percival, and Levon/Lancelot have equal operational authority',
  'Knight inputs are owner-level operational direction when aligned with existing law.',
  'A single Knight cannot override existing law, doctrine, authority boundaries, safety rules, or locked workflow protocol.',
  'System/source detects issue',
  'Knight ChatGPT receives/presents Action Card',
  'targetKnight',
  'targetHuman',
  'productionApplied',
  'doctrineConflict',
  'noExecutionClaim',
  'Route to Gawain/Thomas',
  'Route to Lancelot/Levon',
  'Route to Percival/Dylan',
  'Route to `all_three`',
  'If `doctrineConflict` is true',
  'This is a schema and routing contract. It is not runtime delivery'
];

for (const text of requiredContractText) {
  assert(contract.includes(text), `contract missing required text: ${text}`);
}

assert(Array.isArray(schema.required), 'KnightActionCard schema must define required fields');
for (const field of requiredFields) {
  assert(schema.required.includes(field), `KnightActionCard schema required list missing ${field}`);
}
assert(schema.properties?.productionApplied?.default === false, 'productionApplied schema default must be false');

validateActionCard(template, 'templates/KNIGHT_ACTION_CARD.template.json');

const exampleFiles = readdirSync(examplesDir)
  .filter((file) => file.endsWith('.json'))
  .map((file) => path.join(examplesDir, file));

assert(exampleFiles.length >= 4, 'at least four KnightActionCard examples are required');

const examples = exampleFiles.map((filePath) => [filePath, readJson(filePath)]);
for (const [filePath, card] of examples) {
  validateActionCard(card, path.relative(ROOT, filePath));
}

const exampleProblemTypes = new Set(examples.map(([, card]) => card.problemType));
for (const requiredType of [
  'owner_confirmation_needed',
  'asset_decision_needed',
  'technical_apply_pending'
]) {
  assert(exampleProblemTypes.has(requiredType), `missing example problemType: ${requiredType}`);
}

const syntheticConflict = {
  ...template,
  targetKnight: 'Lancelot',
  targetHuman: 'Levon',
  doctrineConflict: true,
  requiresThreeKnightEscalation: false
};

let conflictRejected = false;
try {
  validateActionCard(syntheticConflict, 'synthetic doctrine conflict');
} catch {
  conflictRejected = true;
}
assert(conflictRejected, 'doctrineConflict true must require all_three routing');

const syntheticP1WithoutEvidence = {
  ...template,
  priority: 'P1',
  evidence: []
};

let missingEvidenceRejected = false;
try {
  validateActionCard(syntheticP1WithoutEvidence, 'synthetic P1 missing evidence');
} catch {
  missingEvidenceRejected = true;
}
assert(missingEvidenceRejected, 'P0/P1 cards without evidence must be rejected');

const syntheticExecutionClaim = {
  ...template,
  executionResult: 'applied'
};

let executionClaimRejected = false;
try {
  validateActionCard(syntheticExecutionClaim, 'synthetic execution claim');
} catch {
  executionClaimRejected = true;
}
assert(executionClaimRejected, 'action cards cannot claim execution');

console.log('KnightActionCard contract, schema, template, and examples passed.');
