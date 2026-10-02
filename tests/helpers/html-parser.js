/**
 * Lightweight, robust HTML and DOM querying utility for static Astro SSG HTML output.
 */

export function parseAttributes(attrString) {
  const attrs = {};
  if (!attrString) return attrs;
  const regex = /([a-zA-Z0-9_:\-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let match;
  while ((match = regex.exec(attrString)) !== null) {
    const key = match[1];
    const val = match[2] !== undefined ? match[2] :
                match[3] !== undefined ? match[3] :
                match[4] !== undefined ? match[4] : '';
    attrs[key] = val;
  }
  return attrs;
}

export function extractTagAttributes(html, tagName) {
  const regex = new RegExp(`<${tagName}\\b([^>]*)>`, 'gi');
  const results = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    results.push(parseAttributes(match[1]));
  }
  return results;
}

export function extractElementsByAttr(html, attrName, attrValue = null) {
  const regex = /<([a-zA-Z0-9\-]+)\b([^>]*)>/g;
  const results = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const tagName = match[1];
    const attrs = parseAttributes(match[2]);
    if (attrName in attrs) {
      if (attrValue === null || attrs[attrName] === attrValue) {
        results.push({ tagName, attrs, rawTag: match[0] });
      }
    }
  }
  return results;
}

export function extractElementsByTag(html, tagName) {
  const regex = new RegExp(`<${tagName}\\b([^>]*)>([\\s\\S]*?)<\\/${tagName}>`, 'gi');
  const results = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    results.push({
      attrs: parseAttributes(match[1]),
      innerHTML: match[2],
      textContent: stripTags(match[2])
    });
  }
  return results;
}

export function stripTags(str) {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function extractMetaTags(html) {
  const metas = extractTagAttributes(html, 'meta');
  const result = {
    named: {},
    properties: {},
    charset: null,
    viewport: null
  };

  for (const m of metas) {
    if (m.charset) result.charset = m.charset;
    if (m.name) {
      result.named[m.name.toLowerCase()] = m.content || '';
      if (m.name.toLowerCase() === 'viewport') result.viewport = m.content || '';
    }
    if (m.property) {
      result.properties[m.property.toLowerCase()] = m.content || '';
    }
  }
  return result;
}

export function extractJsonLd(html) {
  const regex = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const list = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1].trim());
      list.push(parsed);
    } catch (e) {
      list.push({ __error: e.message, __raw: match[1] });
    }
  }
  return list;
}

export function extractLinks(html) {
  const links = extractTagAttributes(html, 'a');
  return links.map(l => ({
    href: l.href || '',
    ariaLabel: l['aria-label'] || '',
    ariaCurrent: l['aria-current'] || null,
    rel: l.rel || '',
    target: l.target || '',
    class: l.class || ''
  }));
}
