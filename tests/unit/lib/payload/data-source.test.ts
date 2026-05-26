import { describe, test, expect } from 'vitest';
import { existsSync } from 'fs';
import { resolve } from 'path';

const ROOT = 'D:\\WORKSPACE\\CODE\\Coporate_Website';
const PAYLOAD_CONFIG = resolve(ROOT, 'lib/payload/config.ts');
const DATA_SOURCE = resolve(ROOT, 'lib/config/data-source.ts');

// AC-01 through AC-04: File existence checks
describe('AC-01: Payload config module must be present', () => {
  test('lib/payload/config.ts must exist', () => {
    expect(existsSync(PAYLOAD_CONFIG)).toBe(true);
  });
});

describe('AC-02: Payload client module must be present', () => {
  test('lib/payload/client.ts must exist', () => {
    expect(existsSync(resolve(ROOT, 'lib/payload/client.ts'))).toBe(true);
  });
});

describe('AC-03: Payload types module must be present', () => {
  test('lib/payload/types.ts must exist', () => {
    expect(existsSync(resolve(ROOT, 'lib/payload/types.ts'))).toBe(true);
  });
});

describe('AC-04: Payload jobs repository must be present', () => {
  test('lib/payload/repositories/jobs.ts must exist', () => {
    expect(existsSync(resolve(ROOT, 'lib/payload/repositories/jobs.ts'))).toBe(true);
  });
});

describe('AC-04: Payload news repository must be present', () => {
  test('lib/payload/repositories/news.ts must exist', () => {
    expect(existsSync(resolve(ROOT, 'lib/payload/repositories/news.ts'))).toBe(true);
  });
});

describe('AC-04: Payload applications repository must be present', () => {
  test('lib/payload/repositories/applications.ts must exist', () => {
    expect(existsSync(resolve(ROOT, 'lib/payload/repositories/applications.ts'))).toBe(true);
  });
});

describe('AC-04: Payload settings repository must be present', () => {
  test('lib/payload/repositories/settings.ts must exist', () => {
    expect(existsSync(resolve(ROOT, 'lib/payload/repositories/settings.ts'))).toBe(true);
  });
});

describe('AC-04: Payload about repository must be present', () => {
  test('lib/payload/repositories/about.ts must exist', () => {
    expect(existsSync(resolve(ROOT, 'lib/payload/repositories/about.ts'))).toBe(true);
  });
});

// AC-05: File source — tests actual exports by reading file content
describe('AC-05: Payload config exports getPayloadConfig and isPayloadDataMode', () => {
  test('getPayloadConfig and isPayloadDataMode are exported from lib/payload/config.ts', () => {
    const content = require('fs').readFileSync(PAYLOAD_CONFIG, 'utf8');
    expect(content).toContain('export');
    expect(content).toContain('getPayloadConfig');
    expect(content).toContain('isPayloadDataMode');
    // isPayloadDataMode must be exported
    expect(content).toMatch(/export\s+(function|const)\s+isPayloadDataMode/);
  });
});

// AC-06: data-source must export isPayloadDataMode
describe('AC-06: lib/config/data-source exports isPayloadDataMode', () => {
  test('data-source.ts must export isPayloadDataMode alongside isMockDataMode', () => {
    const content = require('fs').readFileSync(DATA_SOURCE, 'utf8');
    expect(content).toContain('export');
    expect(content).toContain('isPayloadDataMode');
    expect(content).toMatch(/export\s+(function|const)\s+isPayloadDataMode/);
  });
});