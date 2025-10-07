import { describe, expect, test } from 'bun:test';
import { PersonSchema, BaseStatus } from '../index.js';

describe('Person Model', () => {
  test('should validate a complete Person object', () => {
    const validPerson = {
      key: 'abc123xyz4567890',
      date_created: Date.now(),
      last_updated: Date.now(),
      version: 0,
      status: BaseStatus.Active,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      ip_address: '192.168.1.1',
      details: { notes: 'Test user' },
      email_verified: true,
      verification_key: 'verif123',
      verification_expires_at: Date.now() + 3600000,
      verification_sent_at: Date.now(),
    };

    const result = PersonSchema.safeParse(validPerson);
    expect(result.success).toBe(true);
  });

  test('should validate minimal Person object (required fields only)', () => {
    const minimalPerson = {
      key: 'abc123xyz4567890',
      date_created: Date.now(),
      last_updated: Date.now(),
      version: 0,
      status: BaseStatus.New,
      email: 'jane@example.com',
      ip_address: '127.0.0.1',
      email_verified: false,
    };

    const result = PersonSchema.safeParse(minimalPerson);
    expect(result.success).toBe(true);
  });

  test('should validate email format', () => {
    const validEmails = ['user@example.com', 'user.name@example.com', 'user+tag@example.co.uk'];

    for (const email of validEmails) {
      const person = {
        key: 'abc123xyz4567890',
        date_created: Date.now(),
        last_updated: Date.now(),
        version: 0,
        status: BaseStatus.Active,
        email,
        ip_address: '192.168.1.1',
        email_verified: false,
      };

      const result = PersonSchema.safeParse(person);
      expect(result.success).toBe(true);
    }
  });

  test('should reject invalid email format', () => {
    const invalidEmails = ['notanemail', 'missing@domain', '@example.com', 'user@'];

    for (const email of invalidEmails) {
      const person = {
        key: 'abc123xyz4567890',
        date_created: Date.now(),
        last_updated: Date.now(),
        version: 0,
        status: BaseStatus.Active,
        email,
        ip_address: '192.168.1.1',
        email_verified: false,
      };

      const result = PersonSchema.safeParse(person);
      expect(result.success).toBe(false);
    }
  });

  test('should default email_verified to false', () => {
    const person = {
      key: 'abc123xyz4567890',
      date_created: Date.now(),
      last_updated: Date.now(),
      version: 0,
      status: BaseStatus.Active,
      email: 'user@example.com',
      ip_address: '192.168.1.1',
    };

    const result = PersonSchema.safeParse(person);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email_verified).toBe(false);
    }
  });

  test('should accept optional details object', () => {
    const person = {
      key: 'abc123xyz4567890',
      date_created: Date.now(),
      last_updated: Date.now(),
      version: 0,
      status: BaseStatus.Active,
      email: 'user@example.com',
      ip_address: '192.168.1.1',
      email_verified: false,
      details: {
        source: 'web',
        campaign: 'spring2024',
        notes: 'Signed up during promotion',
      },
    };

    const result = PersonSchema.safeParse(person);
    expect(result.success).toBe(true);
  });
});
