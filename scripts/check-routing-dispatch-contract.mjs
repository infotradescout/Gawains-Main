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

const missingText = requiredContractText.filter((needle) => !contract.includes(needle));
const missingTemplateKeys = requiredDispatchKeys.filter((key) => !(key in template));
const missingSchemaKeys = requiredDispatchKeys.filter((key) => !schema.required?.includes(key));
const missingAuthorityTemplateKeys = requiredAuthorityKeys.filter((key) => !(key in template.authority_state));
const missingAuthoritySchemaKeys = requiredAuthorityKeys.filter(
  (key) => !schema.properties?.authority_state?.required?.includes(key)
);

if (
  missingText.length ||
  missingTemplateKeys.length ||
  missingSchemaKeys.length ||
  missingAuthorityTemplateKeys.length ||
  missingAuthoritySchemaKeys.length ||
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
  if (template.no_runtime_execution_by_roundtable !== true) {
    console.error('Template must set no_runtime_execution_by_roundtable to true');
  }
  process.exitCode = 1;
} else {
  console.log('RoundTable routing dispatch contract, schema, and template checks passed.');
}
