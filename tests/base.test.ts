import { describe, expect, test } from 'bun:test';
import { BaseSchema, BaseStatus } from '../src/base.js';

describe('Base Model', () => {
  test('should validate a valid Base object', () => {
    const validBase = {
      key: 'abc123xyz4567890',
      date_created: Date.now(),
      last_updated: Date.now(),
      version: 0,
      status: BaseStatus.Active,
    };

    const result = BaseSchema.safeParse(validBase);
    expect(result.success).toBe(true);
  });

  test('should reject invalid key length', () => {
    const invalidBase = {
      key: 'short',
      date_created: Date.now(),
      last_updated: Date.now(),
      version: 0,
      status: BaseStatus.Active,
    };

    const result = BaseSchema.safeParse(invalidBase);
    expect(result.success).toBe(false);
  });

  test('should reject negative version', () => {
    const invalidBase = {
      key: 'abc123xyz4567890',
      date_created: Date.now(),
      last_updated: Date.now(),
      version: -1,
      status: BaseStatus.Active,
    };

    const result = BaseSchema.safeParse(invalidBase);
    expect(result.success).toBe(false);
  });

  test('should validate all BaseStatus values', () => {
    const statuses = [
      BaseStatus.New,
      BaseStatus.Pending,
      BaseStatus.Active,
      BaseStatus.Inactive,
      BaseStatus.Verified,
      BaseStatus.Deleted,
      BaseStatus.Shipped,
      BaseStatus.Completed,
    ];

    for (const status of statuses) {
      const base = {
        key: 'abc123xyz4567890',
        date_created: Date.now(),
        last_updated: Date.now(),
        version: 0,
        status,
      };

      const result = BaseSchema.safeParse(base);
      expect(result.success).toBe(true);
    }
  });

  test('should reject missing required fields', () => {
    const incomplete = {
      key: 'abc123xyz4567890',
    };

    const result = BaseSchema.safeParse(incomplete);
    expect(result.success).toBe(false);
  });
});
