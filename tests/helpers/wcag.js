/**
 * WCAG 2.2 Mathematical Contrast Calculation Utilities
 * Standard: W3C Web Content Accessibility Guidelines (WCAG) 2.2
 * Formulas: Relative Luminance (4.5:1 for normal text, 3:1 for large text/graphical)
 */

export function parseHexColor(hex) {
  if (!hex || typeof hex !== 'string') return null;
  let clean = hex.trim();
  if (clean.startsWith('#')) clean = clean.slice(1);
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  if (clean.length !== 6) return null;
  const num = parseInt(clean, 16);
  if (isNaN(num)) return null;
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
    hex: `#${clean.toUpperCase()}`
  };
}

export function parseRgbColor(colorStr) {
  if (!colorStr || typeof colorStr !== 'string') return null;
  const trimmed = colorStr.trim();
  if (trimmed.startsWith('#')) return parseHexColor(trimmed);
  const match = trimmed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (match) {
    return {
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10)
    };
  }
  return null;
}

export function getRelativeLuminance(rgb) {
  if (!rgb) return 0;
  const { r, g, b } = rgb;
  const srgb = [r / 255, g / 255, b / 255];
  const linear = srgb.map(c => {
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

export function getContrastRatio(color1, color2) {
  const c1 = typeof color1 === 'string' ? parseRgbColor(color1) : color1;
  const c2 = typeof color2 === 'string' ? parseRgbColor(color2) : color2;
  if (!c1 || !c2) return 1.0;
  const l1 = getRelativeLuminance(c1);
  const l2 = getRelativeLuminance(c2);
  const maxL = Math.max(l1, l2);
  const minL = Math.min(l1, l2);
  return (maxL + 0.05) / (minL + 0.05);
}

export function isWcagAaCompliant(foreground, background, isLargeText = false) {
  const ratio = getContrastRatio(foreground, background);
  const threshold = isLargeText ? 3.0 : 4.5;
  return {
    ratio,
    threshold,
    compliant: ratio >= threshold,
    ratioFormatted: `${ratio.toFixed(2)}:1`
  };
}
