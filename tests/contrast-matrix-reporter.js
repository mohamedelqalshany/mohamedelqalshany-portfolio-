import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseTokensCss, contrastRatio } from './empirical-contrast-challenger.test.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TOKENS_PATH = path.join(__dirname, '..', 'src', 'styles', 'tokens.css');

const css = fs.readFileSync(TOKENS_PATH, 'utf-8');
const { light, dark } = parseTokensCss(css);

console.log('='.repeat(90));
console.log('EMPIRICAL WCAG 2.2 CONTRAST AUDIT REPORT — MOHAMED EL-QALSHANY');
console.log('='.repeat(90));

function auditTheme(themeName, tokens, textKeys, bgKeys) {
  console.log(`\n--- THEME: ${themeName.toUpperCase()} ---`);
  console.log(
    `${'Text Token'.padEnd(18)} | ${'Text Hex'.padEnd(8)} | ${'Surface Token'.padEnd(18)} | ${'Surf Hex'.padEnd(8)} | ${'Ratio'.padEnd(8)} | ${'Normal'.padEnd(8)} | Large`
  );
  console.log('-'.repeat(90));

  let total = 0;
  let passNormal = 0;
  let passLarge = 0;

  for (const tKey of textKeys) {
    const tHex = tokens[tKey];
    if (!tHex || !tHex.startsWith('#')) continue;

    for (const bKey of bgKeys) {
      const bHex = tokens[bKey];
      if (!bHex || !bHex.startsWith('#')) continue;

      total++;
      const cr = contrastRatio(tHex, bHex);
      const isNormal = cr >= 4.5;
      const isLarge = cr >= 3.0;

      if (isNormal) passNormal++;
      if (isLarge) passLarge++;

      const normalStr = isNormal ? 'PASS' : 'FAIL';
      const largeStr = isLarge ? 'PASS' : 'FAIL';

      console.log(
        `${tKey.padEnd(18)} | ${tHex.padEnd(8)} | ${bKey.padEnd(18)} | ${bHex.padEnd(8)} | ${(cr.toFixed(2) + ':1').padEnd(8)} | ${normalStr.padEnd(8)} | ${largeStr}`
      );
    }
  }

  console.log('-'.repeat(90));
  console.log(`Summary for ${themeName}: ${passNormal}/${total} normal text pass AA, ${passLarge}/${total} large text/UI pass AA.`);
}

// Light theme tokens
const lightText = [
  '--ink',
  '--ink-secondary',
  '--ink-muted',
  '--ink-faint',
  '--brand-primary',
  '--link-text',
  '--link-hover',
  '--accent',
  '--secondary'
];

const lightSurfaces = [
  '--bg',
  '--bg-soft',
  '--bg-alt',
  '--surface',
  '--surface-raised',
  '--surface-sunk'
];

auditTheme('Light Theme', light, lightText, lightSurfaces);

// Dark theme tokens
const darkText = [
  '--ink',
  '--ink-secondary',
  '--ink-muted',
  '--ink-faint',
  '--link-text',
  '--link-hover',
  '--accent',
  '--secondary'
];

const darkSurfaces = [
  '--bg',
  '--bg-soft',
  '--bg-alt',
  '--surface',
  '--surface-raised',
  '--surface-sunk'
];

auditTheme('Dark Theme', dark, darkText, darkSurfaces);

console.log('\n' + '='.repeat(90));
console.log('INTERACTIVE BUTTON PAIRS AUDIT');
console.log('='.repeat(90));

const buttonPairs = [
  { name: 'Light: Forest Btn (Oat on Forest)', fg: light['--on-primary'], bg: light['--primary-forest'] },
  { name: 'Light: Forest Btn (White on Forest)', fg: '#FFFFFF', bg: light['--primary-forest'] },
  { name: 'Light: Mustard Btn (Dark on Mustard)', fg: light['--on-secondary'], bg: light['--secondary'] },
  { name: 'Light: Terracotta Btn (White on Raw)', fg: '#FFFFFF', bg: light['--accent'] },
  { name: 'Light: Terracotta Btn (White on Hover)', fg: '#FFFFFF', bg: light['--accent-hover'] },
  { name: 'Dark: Mustard Btn (Dark on Mustard)', fg: dark['--on-secondary'], bg: dark['--secondary'] },
  { name: 'Dark: Forest Btn (Cream on Luminous Forest)', fg: dark['--on-primary'], bg: dark['--primary-forest'] },
  { name: 'Dark: Terracotta Btn (White on Raw)', fg: '#FFFFFF', bg: dark['--accent'] },
  { name: 'Dark: Terracotta Btn (White on Hover)', fg: '#FFFFFF', bg: dark['--accent-hover'] },
];

for (const btn of buttonPairs) {
  const cr = contrastRatio(btn.fg, btn.bg);
  const normalStr = cr >= 4.5 ? 'PASS (AA)' : (cr >= 3.0 ? 'PASS (Large/UI Only)' : 'FAIL');
  console.log(`${btn.name.padEnd(45)} | ${(btn.fg + ' on ' + btn.bg).padEnd(20)} | ${(cr.toFixed(2) + ':1').padEnd(8)} | ${normalStr}`);
}
console.log('='.repeat(90));
