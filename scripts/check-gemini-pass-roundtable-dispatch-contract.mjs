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

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function classifyGeminiPassAccelerator(packet) {
  const hasTextItems = ['conditions', 'blockers', 'warnings'].some(
    (field) => Array.isArray(packet[field]) && packet[field].length > 0
  );
  const hasFailClosedFlag = [
    'migration_required',
    'legal_trust_warning',
    'authority_warning',
    'merge_risk_annotation',
    'scope_caveat',
    'validation_uncertainty',
    'repo_branch_uncertainty',
    'routing_ambiguity'
  ].some((field) => packet[field] === true);

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

console.log('Gemini PASS RoundTable dispatch accelerator contract checks passed.');
