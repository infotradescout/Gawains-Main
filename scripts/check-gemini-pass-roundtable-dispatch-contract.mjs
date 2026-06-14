#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const contractPath = path.join(root, 'docs', 'ROUNDTABLE_ROUTING_DISPATCH_CONTRACT.md');
const templatePath = path.join(root, 'templates', 'ROUNDTABLE_ROUTING_DISPATCH.template.json');
const schemaPath = path.join(root, 'roundtable', 'schemas', 'routing-dispatch.schema.json');
const albionAuthorityCommit = '0acafbd4f8f6c74b2262fc86d6d47de4c2ae686c';

const contract = fs.readFileSync(contractPath, 'utf8');
const template = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

const failClosedBooleanFields = [
  'migration_required',
  'legal_trust_warning',
  'authority_warning',
  'merge_risk_annotation',
  'scope_caveat',
  'validation_uncertainty',
  'repo_branch_uncertainty',
  'routing_ambiguity'
];

const authorityBoundaryFields = [
  'merge_authority_created',
  'policy_authority_created',
  'roundtable_3_of_3_satisfied',
  'ai_council_3_of_3_satisfied',
  'merlin_execution_authorized'
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertArrayOfStrings(packet, field, label) {
  assert(Array.isArray(packet[field]), `${label}.${field} must be an array`);
  assert(packet[field].every((item) => typeof item === 'string'), `${label}.${field} must contain only strings`);
}

function assertBoolean(packet, field, label) {
  assert(typeof packet[field] === 'boolean', `${label}.${field} must be an explicit boolean`);
}

function assertString(packet, field, label) {
  assert(typeof packet[field] === 'string', `${label}.${field} must be a string`);
}

function validateGeminiReviewPacket(packet, label) {
  assert(packet && typeof packet === 'object' && !Array.isArray(packet), `${label} must be an object`);
  assertString(packet, 'verdict', label);
  for (const field of ['conditions', 'blockers', 'warnings']) {
    assertArrayOfStrings(packet, field, label);
  }
  for (const field of [...failClosedBooleanFields, 'route_target_explicit']) {
    assertBoolean(packet, field, label);
  }
}

function classifyGeminiPassAccelerator(packet) {
  validateGeminiReviewPacket(packet, 'gemini_pass_accelerator_input');
  const hasTextItems = ['conditions', 'blockers', 'warnings'].some(
    (field) => packet[field].length > 0
  );
  const hasFailClosedFlag = failClosedBooleanFields.some((field) => packet[field] === true);

  const cleanPass =
    packet.verdict === 'PASS' &&
    !hasTextItems &&
    !hasFailClosedFlag &&
    packet.route_target_explicit === true;

  return cleanPass
    ? {
        next_hop: 'roundtable_dispatch',
        gawain_manual_preflight_required: false,
        bypasses_gawain_manual_preflight_only: true,
        merge_authority_created: false,
        policy_authority_created: false,
        roundtable_3_of_3_satisfied: false,
        ai_council_3_of_3_satisfied: false,
        merlin_execution_authorized: false
      }
    : {
        next_hop: 'gawain_manual_review',
        gawain_manual_preflight_required: true,
        bypasses_gawain_manual_preflight_only: false,
        merge_authority_created: false,
        policy_authority_created: false,
        roundtable_3_of_3_satisfied: false,
        ai_council_3_of_3_satisfied: false,
        merlin_execution_authorized: false
      };
}

function expectedNextHopFor(packet) {
  return classifyGeminiPassAccelerator(packet).next_hop;
}

function validateDispatchPacket(packet, label) {
  assert(packet && typeof packet === 'object' && !Array.isArray(packet), `${label} must be an object`);
  assert(packet.no_runtime_execution_by_roundtable === true, `${label}.no_runtime_execution_by_roundtable must be true`);

  const accelerator = packet.gemini_pass_accelerator;
  assert(
    accelerator && typeof accelerator === 'object' && !Array.isArray(accelerator),
    `${label}.gemini_pass_accelerator must be an object`
  );
  validateGeminiReviewPacket(accelerator, `${label}.gemini_pass_accelerator`);
  assert(
    accelerator.albion_authority_commit === albionAuthorityCommit,
    `${label}.gemini_pass_accelerator must reference the Albion doctrine authority commit`
  );
  assert(
    ['roundtable_dispatch', 'gawain_manual_review'].includes(accelerator.next_hop),
    `${label}.gemini_pass_accelerator.next_hop must be a known route`
  );
  assertBoolean(accelerator, 'gawain_manual_preflight_required', `${label}.gemini_pass_accelerator`);
  assertBoolean(accelerator, 'bypasses_gawain_manual_preflight_only', `${label}.gemini_pass_accelerator`);
  for (const field of authorityBoundaryFields) {
    assertBoolean(accelerator, field, `${label}.gemini_pass_accelerator`);
    assert(accelerator[field] === false, `${label}.gemini_pass_accelerator.${field} must be false`);
  }

  const expectedNextHop = expectedNextHopFor(accelerator);
  assert(
    accelerator.next_hop === expectedNextHop,
    `${label}.gemini_pass_accelerator.next_hop must match clean PASS fail-closed routing`
  );
  assert(
    accelerator.gawain_manual_preflight_required === (expectedNextHop === 'gawain_manual_review'),
    `${label}.gemini_pass_accelerator.gawain_manual_preflight_required must match next_hop`
  );
  assert(
    accelerator.bypasses_gawain_manual_preflight_only === (expectedNextHop === 'roundtable_dispatch'),
    `${label}.gemini_pass_accelerator.bypasses_gawain_manual_preflight_only must match next_hop`
  );
}

function cleanPacket(overrides = {}) {
  return {
    verdict: 'PASS',
    conditions: [],
    blockers: [],
    warnings: [],
    migration_required: false,
    legal_trust_warning: false,
    authority_warning: false,
    merge_risk_annotation: false,
    scope_caveat: false,
    validation_uncertainty: false,
    repo_branch_uncertainty: false,
    routing_ambiguity: false,
    route_target_explicit: true,
    ...overrides
  };
}

function dispatchPacket(overrides = {}) {
  return {
    ...template,
    no_runtime_execution_by_roundtable: true,
    gemini_pass_accelerator: {
      ...template.gemini_pass_accelerator,
      ...overrides
    }
  };
}

function assertRoutesToRoundtableDispatch(packet, label) {
  const result = classifyGeminiPassAccelerator(packet);
  assert(result.next_hop === 'roundtable_dispatch', `${label} should route to Roundtable Dispatch`);
  assert(result.gawain_manual_preflight_required === false, `${label} should bypass redundant Gawain pre-flight`);
  assert(result.bypasses_gawain_manual_preflight_only === true, `${label} should only bypass Gawain pre-flight`);
  assert(result.merge_authority_created === false, `${label} must not create merge authority`);
  assert(result.policy_authority_created === false, `${label} must not create policy authority`);
  assert(result.roundtable_3_of_3_satisfied === false, `${label} must not satisfy Roundtable 3/3`);
  assert(result.ai_council_3_of_3_satisfied === false, `${label} must not satisfy AI Council 3/3`);
  assert(result.merlin_execution_authorized === false, `${label} must not authorize Merlin execution`);
}

function assertRoutesToGawain(packet, label) {
  const result = classifyGeminiPassAccelerator(packet);
  assert(result.next_hop === 'gawain_manual_review', `${label} should route to Gawain manual review`);
  assert(result.gawain_manual_preflight_required === true, `${label} should require Gawain pre-flight`);
  assert(result.merge_authority_created === false, `${label} must not create merge authority`);
  assert(result.policy_authority_created === false, `${label} must not create policy authority`);
  assert(result.roundtable_3_of_3_satisfied === false, `${label} must not satisfy Roundtable 3/3`);
  assert(result.ai_council_3_of_3_satisfied === false, `${label} must not satisfy AI Council 3/3`);
  assert(result.merlin_execution_authorized === false, `${label} must not authorize Merlin execution`);
}

function assertThrows(callback, label) {
  let threw = false;
  try {
    callback();
  } catch {
    threw = true;
  }
  assert(threw, `${label} should reject malformed input`);
}

const requiredContractNeedles = [
  albionAuthorityCommit,
  'route directly to Roundtable Dispatch only when all clean PASS criteria are true',
  'This bypasses only redundant Gawain manual pre-flight routing validation',
  'The accelerator is void and the packet MUST route back to Gawain manual review',
  'PASS WITH CONDITIONS',
  'BLOCK',
  'needs_revision',
  'No database/schema migration requirement',
  'No legal/trust warning',
  'No authority warning or authority ambiguity',
  'No merge-risk annotation',
  'No scope caveat',
  'No validation uncertainty',
  'No repo/branch uncertainty',
  'No Squire, Village, Merlin, or AI Council routing ambiguity',
  'gemini_pass_accelerator.merge_authority_created = false',
  'gemini_pass_accelerator.policy_authority_created = false',
  'gemini_pass_accelerator.roundtable_3_of_3_satisfied = false',
  'gemini_pass_accelerator.ai_council_3_of_3_satisfied = false',
  'gemini_pass_accelerator.merlin_execution_authorized = false'
];

for (const needle of requiredContractNeedles) {
  assert(contract.includes(needle), `Routing dispatch contract missing: ${needle}`);
}

const requiredSchemaFields = [
  'albion_authority_commit',
  'verdict',
  'conditions',
  'blockers',
  'warnings',
  'migration_required',
  'legal_trust_warning',
  'authority_warning',
  'merge_risk_annotation',
  'scope_caveat',
  'validation_uncertainty',
  'repo_branch_uncertainty',
  'routing_ambiguity',
  'route_target_explicit',
  'next_hop',
  'gawain_manual_preflight_required',
  'bypasses_gawain_manual_preflight_only',
  'merge_authority_created',
  'policy_authority_created',
  'roundtable_3_of_3_satisfied',
  'ai_council_3_of_3_satisfied',
  'merlin_execution_authorized'
];

assert(schema.required.includes('gemini_pass_accelerator'), 'routing dispatch schema must require gemini_pass_accelerator');
for (const field of requiredSchemaFields) {
  assert(
    schema.properties.gemini_pass_accelerator.required.includes(field),
    `gemini_pass_accelerator schema missing required field: ${field}`
  );
  assert(
    Object.prototype.hasOwnProperty.call(template.gemini_pass_accelerator, field),
    `gemini_pass_accelerator template missing field: ${field}`
  );
}

assert(
  template.gemini_pass_accelerator.albion_authority_commit === albionAuthorityCommit,
  'template must reference the Albion doctrine authority commit'
);
assert(template.no_runtime_execution_by_roundtable === true, 'dispatch template must not allow RoundTable runtime execution');
validateDispatchPacket(template, 'routing dispatch template');

assertRoutesToRoundtableDispatch(cleanPacket(), 'clean PASS');
assertRoutesToGawain(cleanPacket({ verdict: 'PASS WITH CONDITIONS', conditions: ['condition'] }), 'PASS WITH CONDITIONS');
assertRoutesToGawain(cleanPacket({ verdict: 'BLOCK', blockers: ['blocker'] }), 'BLOCK');
assertRoutesToGawain(cleanPacket({ verdict: 'needs_revision' }), 'needs_revision');
assertRoutesToGawain(cleanPacket({ warnings: ['linter warning'] }), 'warning');
assertRoutesToGawain(cleanPacket({ migration_required: true }), 'migration requirement');
assertRoutesToGawain(cleanPacket({ legal_trust_warning: true }), 'legal/trust warning');
assertRoutesToGawain(cleanPacket({ authority_warning: true }), 'authority ambiguity');
assertRoutesToGawain(cleanPacket({ merge_risk_annotation: true }), 'merge-risk annotation');
assertRoutesToGawain(cleanPacket({ scope_caveat: true }), 'scope caveat');
assertRoutesToGawain(cleanPacket({ validation_uncertainty: true }), 'validation uncertainty');
assertRoutesToGawain(cleanPacket({ repo_branch_uncertainty: true }), 'repo/branch uncertainty');
assertRoutesToGawain(cleanPacket({ routing_ambiguity: true }), 'routing ambiguity');
assertRoutesToGawain(cleanPacket({ route_target_explicit: false }), 'unclear route target');

validateDispatchPacket(
  dispatchPacket({
    verdict: 'PASS',
    route_target_explicit: true,
    next_hop: 'roundtable_dispatch',
    gawain_manual_preflight_required: false,
    bypasses_gawain_manual_preflight_only: true
  }),
  'clean PASS dispatch packet'
);
validateDispatchPacket(dispatchPacket({ verdict: 'PASS WITH CONDITIONS', conditions: ['condition'] }), 'fail-closed packet');

assertThrows(() => classifyGeminiPassAccelerator(cleanPacket({ conditions: 'none' })), 'non-array conditions');
assertThrows(() => classifyGeminiPassAccelerator(cleanPacket({ warnings: [1] })), 'non-string warning');
assertThrows(() => classifyGeminiPassAccelerator(cleanPacket({ migration_required: 'false' })), 'non-boolean flag');
assertThrows(() => classifyGeminiPassAccelerator(cleanPacket({ route_target_explicit: undefined })), 'missing route target');
assertThrows(
  () => validateDispatchPacket(dispatchPacket({ albion_authority_commit: 'wrong' }), 'wrong authority commit'),
  'wrong authority commit'
);
assertThrows(
  () => validateDispatchPacket(dispatchPacket({ verdict: 'PASS', route_target_explicit: true }), 'wrong next hop'),
  'roundtable dispatch consistency'
);
assertThrows(
  () => validateDispatchPacket(dispatchPacket({ merge_authority_created: true }), 'authority escalation'),
  'authority escalation'
);

console.log('Gemini PASS RoundTable dispatch accelerator contract checks passed.');
