import { describe, expect, test } from 'bun:test';
import { UserPasswordSchema } from '../index.js';

describe('UserPassword Model', () => {
  test('should validate a complete UserPassword object', () => {
    const validPassword = {
      user_key: 'usr:12xyz4567890',
      password_hash: '$argon2id$v=19$m=65536,t=3,p=4$...',
      date_created: Date.now(),
      last_updated: Date.now(),
      salt: 'randomsalt123',
    };

    const result = UserPasswordSchema.safeParse(validPassword);
    expect(result.success).toBe(true);
  });

  test('should validate UserPassword without optional salt', () => {
    const passwordWithoutSalt = {
      user_key: 'usr:12xyz4567890',
      password_hash: '$argon2id$v=19$m=65536,t=3,p=4$...',
      date_created: Date.now(),
      last_updated: Date.now(),
    };

    const result = UserPasswordSchema.safeParse(passwordWithoutSalt);
    expect(result.success).toBe(true);
  });

  test('should enforce user_key starts with "usr:"', () => {
    const invalidPassword = {
      user_key: 'abc123xyz4567890', // doesn't start with usr:
      password_hash: '$argon2id$v=19$m=65536,t=3,p=4$...',
      date_created: Date.now(),
      last_updated: Date.now(),
    };

    const result = UserPasswordSchema.safeParse(invalidPassword);
    expect(result.success).toBe(false);
  });

  test('should enforce user_key length of 16 characters', () => {
    const invalidPassword = {
      user_key: 'usr:short', // too short
      password_hash: '$argon2id$v=19$m=65536,t=3,p=4$...',
      date_created: Date.now(),
      last_updated: Date.now(),
    };

    const result = UserPasswordSchema.safeParse(invalidPassword);
    expect(result.success).toBe(false);
  });

  test('should reject missing required fields', () => {
    const incomplete = {
      user_key: 'usr:12xyz4567890',
      password_hash: '$argon2id$v=19$m=65536,t=3,p=4$...',
      // missing date_created and last_updated
    };

    const result = UserPasswordSchema.safeParse(incomplete);
    expect(result.success).toBe(false);
  });
});
