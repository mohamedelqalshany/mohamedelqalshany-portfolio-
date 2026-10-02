/**
 * Schema.org JSON-LD Validation Helper
 */

export function validatePersonSchema(schema) {
  const issues = [];
  if (!schema) {
    issues.push('Schema object is null or undefined');
    return { valid: false, issues };
  }

  if (schema['@context'] !== 'https://schema.org' && schema['@context'] !== 'http://schema.org') {
    issues.push(`Invalid @context: ${schema['@context']}`);
  }

  if (schema['@type'] !== 'Person') {
    issues.push(`Expected @type to be 'Person', got '${schema['@type']}'`);
  }

  if (!schema.name || typeof schema.name !== 'string') {
    issues.push('Missing or invalid "name" property');
  }

  if (!schema.url || typeof schema.url !== 'string') {
    issues.push('Missing or invalid "url" property');
  }

  if (!schema.jobTitle || typeof schema.jobTitle !== 'string') {
    issues.push('Missing or invalid "jobTitle" property');
  }

  if (!schema.email || typeof schema.email !== 'string') {
    issues.push('Missing or invalid "email" property');
  }

  if (!schema.telephone || typeof schema.telephone !== 'string') {
    issues.push('Missing or invalid "telephone" property');
  }

  if (!schema.address || typeof schema.address !== 'object') {
    issues.push('Missing or invalid "address" property');
  } else {
    if (schema.address['@type'] !== 'PostalAddress') {
      issues.push(`Address @type should be 'PostalAddress', got '${schema.address['@type']}'`);
    }
    if (!schema.address.addressCountry) {
      issues.push('Address missing addressCountry');
    }
  }

  if (!Array.isArray(schema.knowsLanguage) || schema.knowsLanguage.length < 2) {
    issues.push('Expected "knowsLanguage" to be an array with at least 2 languages (ar, en)');
  }

  return {
    valid: issues.length === 0,
    issues
  };
}
