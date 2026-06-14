#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const contractPath = path.join(root, 'docs', 'ROUNDTABLE_ROUTING_DISPATCH_CONTRACT.md');
const templatePath = path.join(root, 'templates', 'ROUNDTABLE_ROUTING_DISPATCH.template.json');
const schemaPath = path.join(root, 'roundtable', 'schemas', 'routing-dispatch.schema.json');

const contract = fs.readFileSync(contractPath, 'utf8');
const template = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

const requiredContractText = [
  'RoundTable owns routing dispatch records',
  'Product repos and Merlin own execution',
  'Gemini PASS is required before RoundTable may dispatch merge, deployment, or closure',
  'Gemini unconditional PASS routing accelerator is derived from Albion doctrine commit `0acafbd4f8f6c74b2262fc86d6d47de4c2ae686c`',
  'bypasses only redundant Gawain manual pre-flight routing validation',
  'gemini_pass_accelerator.next_hop = roundtable_dispatch',
  'gemini_pass_accelerator.next_hop = gawain_manual_review',
  'gemini_pass_accelerator.merge_authority_created = false',
  'gemini_pass_accelerator.merlin_execution_authorized = false',
  'RoundTable must not contain',
  'Runtime dispatch code',
  'no_runtime_execution_by_roundtable',
  'approvalStatus',
  'approvedBy',
  'Production claims without production/user-visible verification'
];

const requiredDispatchKeys = [
  'dispatch_id',
  'packet_id',
  'repo',
  'target_branch',
  'baseline_sha',
  'dispatch_type',
  'requested_action',
  'gemini_status',
  'gemini_result_ref',
  'gawain_decision_ref',
  'review_packet_ref',
  'production_verification_ref',
  'authority_state',
  'gemini_pass_accelerator',
  'execution_owner',
  'no_runtime_execution_by_roundtable',
  'status',
  'created_at',
  'updated_at'
];

const requiredAuthorityKeys = [
  'authorized_by',
  'human_authority_required',
  'gemini_required',
  'merge_authorized',
  'deployment_authorized',
  'production_claim_allowed'
];

const requiredAcceleratorKeys = [
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

const missingText = requiredContractText.filter((needle) => !contract.includes(needle));
const missingTemplateKeys = requiredDispatchKeys.filter((key) => !(key in template));
const missingSchemaKeys = requiredDispatchKeys.filter((key) => !schema.required?.includes(key));
const missingAuthorityTemplateKeys = requiredAuthorityKeys.filter((key) => !(key in template.authority_state));
const missingAuthoritySchemaKeys = requiredAuthorityKeys.filter(
  (key) => !schema.properties?.authority_state?.required?.includes(key)
);
const missingAcceleratorTemplateKeys = requiredAcceleratorKeys.filter(
  (key) => !(key in template.gemini_pass_accelerator)
);
const missingAcceleratorSchemaKeys = requiredAcceleratorKeys.filter(
  (key) => !schema.properties?.gemini_pass_accelerator?.required?.includes(key)
);

if (
  missingText.length ||
  missingTemplateKeys.length ||
  missingSchemaKeys.length ||
  missingAuthorityTemplateKeys.length ||
  missingAuthoritySchemaKeys.length ||
  missingAcceleratorTemplateKeys.length ||
  missingAcceleratorSchemaKeys.length ||
  template.gemini_pass_accelerator?.albion_authority_commit !== '0acafbd4f8f6c74b2262fc86d6d47de4c2ae686c' ||
  template.gemini_pass_accelerator?.merge_authority_created !== false ||
  template.gemini_pass_accelerator?.policy_authority_created !== false ||
  template.gemini_pass_accelerator?.roundtable_3_of_3_satisfied !== false ||
  template.gemini_pass_accelerator?.ai_council_3_of_3_satisfied !== false ||
  template.gemini_pass_accelerator?.merlin_execution_authorized !== false ||
  template.no_runtime_execution_by_roundtable !== true
) {
  if (missingText.length) console.error(`Missing contract text: ${missingText.join(', ')}`);
  if (missingTemplateKeys.length) console.error(`Missing template keys: ${missingTemplateKeys.join(', ')}`);
  if (missingSchemaKeys.length) console.error(`Missing schema required keys: ${missingSchemaKeys.join(', ')}`);
  if (missingAuthorityTemplateKeys.length) {
    console.error(`Missing authority template keys: ${missingAuthorityTemplateKeys.join(', ')}`);
  }
  if (missingAuthoritySchemaKeys.length) {
    console.error(`Missing authority schema keys: ${missingAuthoritySchemaKeys.join(', ')}`);
  }
  if (missingAcceleratorTemplateKeys.length) {
    console.error(`Missing accelerator template keys: ${missingAcceleratorTemplateKeys.join(', ')}`);
  }
  if (missingAcceleratorSchemaKeys.length) {
    console.error(`Missing accelerator schema keys: ${missingAcceleratorSchemaKeys.join(', ')}`);
  }
  if (template.gemini_pass_accelerator?.albion_authority_commit !== '0acafbd4f8f6c74b2262fc86d6d47de4c2ae686c') {
    console.error('Template must reference Albion authority commit 0acafbd4f8f6c74b2262fc86d6d47de4c2ae686c');
  }
  if (template.gemini_pass_accelerator?.merge_authority_created !== false) {
    console.error('Gemini PASS accelerator must not create merge authority');
  }
  if (template.gemini_pass_accelerator?.policy_authority_created !== false) {
    console.error('Gemini PASS accelerator must not create policy authority');
  }
  if (template.gemini_pass_accelerator?.roundtable_3_of_3_satisfied !== false) {
    console.error('Gemini PASS accelerator must not satisfy Roundtable 3/3');
  }
  if (template.gemini_pass_accelerator?.ai_council_3_of_3_satisfied !== false) {
    console.error('Gemini PASS accelerator must not satisfy AI Council 3/3');
  }
  if (template.gemini_pass_accelerator?.merlin_execution_authorized !== false) {
    console.error('Gemini PASS accelerator must not authorize Merlin execution');
  }
  if (template.no_runtime_execution_by_roundtable !== true) {
    console.error('Template must set no_runtime_execution_by_roundtable to true');
  }
  process.exitCode = 1;
} else {
  console.log('RoundTable routing dispatch contract, schema, and template checks passed.');
}
