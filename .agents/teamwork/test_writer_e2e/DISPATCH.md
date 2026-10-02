# Dispatch for E2E Test Suite Writer (test_writer_e2e)

## 2026-09-30T17:01:00Z
- **Role**: E2E Test Suite Architect & Writer
- **Working Directory**: `C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany\.agents\teamwork\test_writer_e2e`
- **Project Root**: `C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany`
- **Authoritative Request**: `C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany\.agents\teamwork\ORIGINAL_REQUEST.md`
- **Project Specification**: `C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany\.agents\teamwork\PROJECT.md`

### Mandatory Integrity Warning:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

### Scope & Responsibilities:
1. You own exclusively the test suite files in `tests/` directory (or scripts/test scripts) and the test track documentation:
   - `C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany\.agents\teamwork\TEST_INFRA.md`
   - `C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany\.agents\teamwork\TEST_READY.md`
   - `C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany\TEST_READY.md`
   You MUST NOT modify source code files in `src/`!
2. Create an opaque-box, requirement-driven test suite testing the compiled build and endpoints against all 26 inventoried features in `PROJECT.md`:
   - **Tier 1 - Feature Coverage**: ≥5 tests per feature (happy path isolation).
   - **Tier 2 - Boundary & Corner Cases**: ≥5 tests per feature (boundary values, extreme inputs, empty states, long texts).
   - **Tier 3 - Cross-Feature Combinations**: Pairwise coverage (e.g., audio play + theme toggle + language switch; video fullscreen + RTL mode).
   - **Tier 4 - Real-World Application Scenarios**: ≥5 end-to-end user journeys (e.g., visitor lands on gateway, reads poetic manifesto, switches to English, enters VO hub, filters by IVR, plays sample, adjusts playback speed, switches to marketing hub, reviews one-man crew packages, clicks WhatsApp CTA).
3. Test suite execution:
   - Provide an executable Node.js test runner script (e.g. `node tests/run-all.js` or `npm test`) that tests the static files (`dist/`), HTML semantic structure, contrast rules, JSON-LD schemas, audio/video player markup & concurrency logic, and asset references.
4. When test cases are written and test runner is ready, run the test runner to establish baseline scores, document everything in `TEST_INFRA.md`, and publish `TEST_READY.md`.
5. Write your complete handoff report in `handoff.md`.
