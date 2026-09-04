// A deliberately small JSON Schema checker: exactly the keywords
// schema/mod.schema.json uses, and nothing else. Keeping the schema as the
// single source of truth beats hand-rolled field checks that drift from it,
// and a dependency-free validator keeps CI to a bare `node`.

const TYPES = {
  object: (v) => v !== null && typeof v === 'object' && !Array.isArray(v),
  array: Array.isArray,
  string: (v) => typeof v === 'string',
  boolean: (v) => typeof v === 'boolean',
  integer: (v) => Number.isInteger(v),
  number: (v) => typeof v === 'number',
};

// Loose on purpose: the strict shape checks live in the `pattern` next to it.
const looksLikeUri = (v) => /^[a-z][a-z0-9+.-]*:\/\/[^\s]+$/i.test(v);

export function validate(value, schema, path = '') {
  const errors = [];
  const at = path || '(root)';

  if (schema.type) {
    const check = TYPES[schema.type];
    if (check && !check(value)) {
      errors.push(`${at}: expected ${schema.type}, got ${describe(value)}`);
      return errors; // every later keyword assumes the type held
    }
  }

  if (schema.enum && !schema.enum.includes(value)) {
    errors.push(`${at}: ${JSON.stringify(value)} is not one of ${schema.enum.join(', ')}`);
  }

  if (typeof value === 'string') {
    if (schema.minLength !== undefined && value.length < schema.minLength) {
      errors.push(`${at}: shorter than ${schema.minLength} characters`);
    }
    if (schema.maxLength !== undefined && value.length > schema.maxLength) {
      errors.push(`${at}: longer than ${schema.maxLength} characters`);
    }
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) {
      errors.push(`${at}: ${JSON.stringify(value)} does not match ${schema.pattern}`);
    }
    if (schema.format === 'uri' && !looksLikeUri(value)) {
      errors.push(`${at}: ${JSON.stringify(value)} is not a URL`);
    }
  }

  if (typeof value === 'number') {
    if (schema.minimum !== undefined && value < schema.minimum) {
      errors.push(`${at}: below minimum ${schema.minimum}`);
    }
    if (schema.maximum !== undefined && value > schema.maximum) {
      errors.push(`${at}: above maximum ${schema.maximum}`);
    }
  }

  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) {
      errors.push(`${at}: needs at least ${schema.minItems} item(s)`);
    }
    if (schema.maxItems !== undefined && value.length > schema.maxItems) {
      errors.push(`${at}: at most ${schema.maxItems} item(s)`);
    }
    if (schema.uniqueItems) {
      const seen = new Set(value.map((v) => JSON.stringify(v)));
      if (seen.size !== value.length) errors.push(`${at}: contains duplicates`);
    }
    if (schema.items) {
      value.forEach((item, i) => {
        errors.push(...validate(item, schema.items, `${at}[${i}]`));
      });
    }
  }

  if (TYPES.object(value)) {
    for (const key of schema.required || []) {
      if (value[key] === undefined) errors.push(`${at}: missing required field "${key}"`);
    }
    if (schema.additionalProperties === false && schema.properties) {
      for (const key of Object.keys(value)) {
        if (!(key in schema.properties)) errors.push(`${at}: unknown field "${key}"`);
      }
    }
    for (const [key, sub] of Object.entries(schema.properties || {})) {
      if (value[key] !== undefined) {
        errors.push(...validate(value[key], sub, path ? `${path}.${key}` : key));
      }
    }
  }

  return errors;
}

function describe(v) {
  if (v === null) return 'null';
  if (Array.isArray(v)) return 'array';
  return typeof v;
}
