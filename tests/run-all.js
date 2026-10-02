#!/usr/bin/env node

/**
 * Mohamed El-Qalshany Portfolio Website
 * Master E2E Test Suite Runner (Tiers 1 - 4)
 *
 * Runs all 4 test tiers using Node.js built-in test runner:
 * - Tier 1: Feature Coverage (26 features x >=5 tests = 135 tests)
 * - Tier 2: Boundary & Corner Cases (26 features x 5 tests = 130 tests)
 * - Tier 3: Cross-Feature Combinations & Pairwise Interactions (15 suites = 33 tests)
 * - Tier 4: Real-World Application Scenarios (5 user journeys = 26 tests)
 *
 * Total Suite: 324 Tests
 */

import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const testSuites = [
  {
    tier: 'Tier 1',
    name: 'Feature Coverage (26 Features in PROJECT.md)',
    file: 'tests/tier1-features.test.js',
    expectedMinTests: 130
  },
  {
    tier: 'Tier 2',
    name: 'Boundary & Corner Cases (26 Features)',
    file: 'tests/tier2-boundary.test.js',
    expectedMinTests: 130
  },
  {
    tier: 'Tier 3',
    name: 'Cross-Feature Pairwise Interactions',
    file: 'tests/tier3-pairwise.test.js',
    expectedMinTests: 30
  },
  {
    tier: 'Tier 4',
    name: 'Real-World Visitor Scenarios (5 End-to-End Journeys)',
    file: 'tests/tier4-scenarios.test.js',
    expectedMinTests: 25
  }
];

// ANSI Colors
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
  bgGreen: '\x1b[42m\x1b[30m',
  bgRed: '\x1b[41m\x1b[37m'
};

function runSuite(suite) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const child = spawn(process.execPath, ['--test', suite.file], {
      cwd: PROJECT_ROOT,
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (d) => { stdout += d.toString(); });
    child.stderr.on('data', (d) => { stderr += d.toString(); });

    child.on('close', (code) => {
      const durationMs = Date.now() - startTime;
      
      // Parse pass/fail counts from node:test output
      const passMatch = stdout.match(/ℹ pass (\d+)/);
      const failMatch = stdout.match(/ℹ fail (\d+)/);
      const totalMatch = stdout.match(/ℹ tests (\d+)/);

      const passCount = passMatch ? parseInt(passMatch[1], 10) : 0;
      const failCount = failMatch ? parseInt(failMatch[1], 10) : (code !== 0 ? 1 : 0);
      const totalCount = totalMatch ? parseInt(totalMatch[1], 10) : passCount + failCount;

      resolve({
        ...suite,
        code,
        durationMs,
        total: totalCount,
        pass: passCount,
        fail: failCount,
        stdout,
        stderr
      });
    });
  });
}

async function main() {
  console.log(`\n${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}    MOHAMED EL-QALSHANY PORTFOLIO — MASTER E2E TEST SUITE RUNNER${colors.reset}`);
  console.log(`${colors.dim}    Dual-Persona Voice Over & Solopreneur Full-Cycle Marketing Platform${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════════════════════${colors.reset}\n`);

  const results = [];
  let grandTotal = 0;
  let grandPass = 0;
  let grandFail = 0;
  const suiteStartTime = Date.now();

  for (const suite of testSuites) {
    process.stdout.write(`  ${colors.dim}Running ${suite.tier}: ${suite.name}...${colors.reset}`);
    const res = await runSuite(suite);
    results.push(res);
    grandTotal += res.total;
    grandPass += res.pass;
    grandFail += res.fail;

    if (res.code === 0 && res.fail === 0) {
      console.log(`\r  ${colors.green}✔ ${suite.tier}: ${suite.name}${colors.reset} ${colors.bold}(${res.pass}/${res.total} passed in ${res.durationMs}ms)${colors.reset}`);
    } else {
      console.log(`\r  ${colors.red}✖ ${suite.tier}: ${suite.name}${colors.reset} ${colors.bold}(${res.fail} failed, ${res.pass}/${res.total} passed in ${res.durationMs}ms)${colors.reset}`);
      if (res.stderr) {
        console.error(`${colors.dim}${res.stderr.slice(0, 500)}${colors.reset}`);
      }
    }
  }

  const grandDuration = Date.now() - suiteStartTime;

  console.log(`\n${colors.cyan}──────────────────────────────────────────────────────────────────────────────────${colors.reset}`);
  console.log(`${colors.bold}  TEST EXECUTION SUMMARY MATRIX${colors.reset}`);
  console.log(`${colors.cyan}──────────────────────────────────────────────────────────────────────────────────${colors.reset}`);
  console.log(`  ${'Tier & Coverage Area'.padEnd(46)} | ${'Tests'.padEnd(8)} | ${'Pass'.padEnd(6)} | ${'Fail'.padEnd(6)} | ${'Time'.padEnd(8)}`);
  console.log(`  ${''.padEnd(46, '-')} | ${''.padEnd(8, '-')} | ${''.padEnd(6, '-')} | ${''.padEnd(6, '-')} | ${''.padEnd(8, '-')}`);

  for (const r of results) {
    const tierLabel = `${r.tier}: ${r.name.length > 36 ? r.name.slice(0, 33) + '...' : r.name}`;
    const statusColor = r.fail === 0 ? colors.green : colors.red;
    console.log(
      `  ${tierLabel.padEnd(46)} | ` +
      `${r.total.toString().padEnd(8)} | ` +
      `${statusColor}${r.pass.toString().padEnd(6)}${colors.reset} | ` +
      `${r.fail > 0 ? colors.red : colors.dim}${r.fail.toString().padEnd(6)}${colors.reset} | ` +
      `${(r.durationMs + 'ms').padEnd(8)}`
    );
  }

  console.log(`  ${''.padEnd(46, '=')} | ${''.padEnd(8, '=')} | ${''.padEnd(6, '=')} | ${''.padEnd(6, '=')} | ${''.padEnd(8, '=')}`);
  console.log(
    `  ${colors.bold}${'TOTALS'.padEnd(46)}${colors.reset} | ` +
    `${colors.bold}${grandTotal.toString().padEnd(8)}${colors.reset} | ` +
    `${colors.green}${colors.bold}${grandPass.toString().padEnd(6)}${colors.reset} | ` +
    `${grandFail > 0 ? colors.red + colors.bold : colors.dim}${grandFail.toString().padEnd(6)}${colors.reset} | ` +
    `${colors.bold}${(grandDuration + 'ms').padEnd(8)}${colors.reset}`
  );
  console.log(`${colors.cyan}──────────────────────────────────────────────────────────────────────────────────${colors.reset}\n`);

  if (grandFail === 0) {
    console.log(`  ${colors.bgGreen} PASS ${colors.reset} ${colors.green}${colors.bold}ALL ${grandTotal} TESTS PASSED WITH 100% SUCCESS RATE (${grandDuration}ms)${colors.reset}`);
    console.log(`  ${colors.dim}Baseline certification: Ready for production deployment.${colors.reset}\n`);
    process.exit(0);
  } else {
    console.log(`  ${colors.bgRed} FAIL ${colors.reset} ${colors.red}${colors.bold}${grandFail} TESTS FAILED OUT OF ${grandTotal}.${colors.reset}\n`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal Test Runner Error:', err);
  process.exit(1);
});
