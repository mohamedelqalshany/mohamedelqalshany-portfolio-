---
name: "a11y-audit"
description: "Accessibility audit skill for scanning, fixing, and verifying WCAG 2.2 Level A and AA compliance across React, Next.js, Vue, Angular, Svelte, and plain HTML codebases. Use when auditing accessibility, fixing a11y violations, checking color contrast, generating compliance reports, or integrating accessibility checks into CI/CD pipelines."
---

# Accessibility Audit

WCAG 2.2 Accessibility Audit and Remediation Skill

## Core Methodology
1. Scans codebase for WCAG 2.2 Level A and AA violations (Critical, Major, Minor).
2. Color contrast validation: foreground/background pairs against AA (4.5:1 for normal text, 3:1 for large text) and AAA (7:1 normal, 4.5:1 large).
3. Contrast formula: (L1 + 0.05) / (L2 + 0.05) where L = 0.2126R + 0.7152G + 0.0722B.
4. Framework and plain HTML a11y patterns: semantic elements, aria attributes, focus management, keyboard accessibility.
