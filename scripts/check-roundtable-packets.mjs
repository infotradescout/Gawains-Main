#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from './repo-registry.mjs';

const schemasDir = path.join(ROOT, 'roundtable', 'schemas');

const schemaChecks = [
  {
    file: 'work-packet.schema.json',
    required: [
      'packet_id',
      'repo',
      'target_branch',
      'baseline_sha',
      'issue_summary',
      'visible_goal',
      'user_problem',
      'acceptance_criteria',
      'files_or_areas_to_inspect',
      'forbidden_changes',
      'validation_required',
      'production_verification_required',
      'decision_owner',
      'gemini_required',
      'status',
      'created_at',
      'updated_at'
    ]
  },
  {
    file: 'review-packet.schema.json',
    required: [
      'packet_id',
      'repo',
      'branch',
      'baseline_sha',
      'final_sha',
      'files_inspected',
      'files_changed',
      'root_cause',
      'behavior_before',
      'behavior_after',
      'validation_results',
      'production_verification',
      'remaining_risks',
      'final_git_status'
    ]
  },
  {
    file: 'decision-record.schema.json',
    required: [
      'packet_id',
      'repo',
      'decision',
      'decided_by',
      'reason',
      'conditions',
      'merge_authorized',
      'deployment_authorized',
      'production_claim_allowed'
    ]
  },
  {
    file: 'production-verification.schema.json',
    required: [
      'packet_id',
      'repo',
      'url_or_endpoint_checked',
      'deployed_sha_observed',
      'evidence',
      'pass_fail',
      'verified_by',
      'verified_at'
    ]
  },
  {
    file: 'repo-status-ledger.schema.json',
    required: ['ledger_id', 'updated_at', 'repos']
  }
];

const allowedRepos = new Set([
  'MealScout',
  'TradeScout',
  'Sway',
  'Albion',
  'Merlin',
  'AutoBott'
]);

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertRequiredFields(object, required, label) {
  for (const field of required) {
    assert(Object.prototype.hasOwnProperty.call(object, field), `${label} missing required field: ${field}`);
  }
}

function listJsonFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listJsonFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push(fullPath);
    }
  }
  return files;
}

for (const check of schemaChecks) {
  const schemaPath = path.join(schemasDir, check.file);
  const schema = readJson(schemaPath);
  assert(Array.isArray(schema.required), `${check.file} must define required fields`);
  for (const field of check.required) {
    assert(schema.required.includes(field), `${check.file} required list missing ${field}`);
  }
}

const workSchema = readJson(path.join(schemasDir, 'work-packet.schema.json'));
const reviewSchema = readJson(path.join(schemasDir, 'review-packet.schema.json'));
const decisionSchema = readJson(path.join(schemasDir, 'decision-record.schema.json'));
const productionSchema = readJson(path.join(schemasDir, 'production-verification.schema.json'));
const activeDir = path.join(ROOT, 'roundtable', 'active');
for (const filePath of listJsonFiles(activeDir)) {
  const packet = readJson(filePath);
  assertRequiredFields(packet, workSchema.required, path.relative(ROOT, filePath));
  assert(allowedRepos.has(packet.repo), `${packet.packet_id} has unknown repo: ${packet.repo}`);
  assert(packet.status === 'active', `${packet.packet_id} in active/ must have status active`);
}

const reviewDir = path.join(ROOT, 'roundtable', 'review');
for (const filePath of listJsonFiles(reviewDir)) {
  const packet = readJson(filePath);
  assertRequiredFields(packet, reviewSchema.required, path.relative(ROOT, filePath));
  assert(allowedRepos.has(packet.repo), `${packet.packet_id} has unknown repo: ${packet.repo}`);
}

const approvedDir = path.join(ROOT, 'roundtable', 'approved');
for (const filePath of listJsonFiles(approvedDir)) {
  const packet = readJson(filePath);
  assertRequiredFields(packet, decisionSchema.required, path.relative(ROOT, filePath));
  assert(allowedRepos.has(packet.repo), `${packet.packet_id} has unknown repo: ${packet.repo}`);
}

const closedDir = path.join(ROOT, 'roundtable', 'closed');
for (const filePath of listJsonFiles(closedDir)) {
  const packet = readJson(filePath);
  const relativePath = path.relative(ROOT, filePath);
  if (filePath.endsWith('.production-verification.json')) {
    assertRequiredFields(packet, productionSchema.required, relativePath);
  } else {
    assertRequiredFields(packet, workSchema.required, relativePath);
    assert(packet.status === 'closed', `${packet.packet_id} in closed/ must have status closed`);
  }
  assert(allowedRepos.has(packet.repo), `${packet.packet_id} has unknown repo: ${packet.repo}`);
}

const ledgerSchema = readJson(path.join(schemasDir, 'repo-status-ledger.schema.json'));
const ledgerPath = path.join(ROOT, 'roundtable', 'ledgers', 'repo-status-ledger.json');
const ledger = readJson(ledgerPath);
assertRequiredFields(ledger, ledgerSchema.required, 'repo-status-ledger');
assert(Array.isArray(ledger.repos), 'repo-status-ledger repos must be an array');
for (const repo of ledger.repos) {
  assert(allowedRepos.has(repo.repo), `repo-status-ledger has unknown repo: ${repo.repo}`);
  assert(Array.isArray(repo.active_packet_ids), `${repo.repo} active_packet_ids must be an array`);
}

const requiredDirs = ['inbox', 'active', 'review', 'approved', 'blocked', 'closed', 'ledgers', 'schemas'];
for (const dir of requiredDirs) {
  const fullPath = path.join(ROOT, 'roundtable', dir);
  assert(statSync(fullPath).isDirectory(), `Missing roundtable/${dir}/ directory`);
}

console.log('Round Table packet control schemas and records are valid.');
