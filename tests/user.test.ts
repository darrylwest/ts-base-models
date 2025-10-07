import { describe, expect, test } from 'bun:test';
import { UserSchema, ContactSchema, BaseStatus } from '../index.js';

describe('User Model', () => {
  test('should validate a complete User object', () => {
    const validUser = {
      key: 'usr:12xyz4567890',
      date_created: Date.now(),
      last_updated: Date.now(),
      version: 0,
      status: BaseStatus.Active,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      ip_address: '192.168.1.1',
      email_verified: true,
      roles: 'admin,user',
      preferences: { theme: 'dark', language: 'en' },
      company_name: 'Acme Corp',
      addresses: [
        {
          addr1: '123 Main St',
          city: 'Seattle',
          state: 'WA',
          zip: '98101',
        },
      ],
    };

    const result = UserSchema.safeParse(validUser);
    expect(result.success).toBe(true);
  });

  test('should enforce key starts with "usr:"', () => {
    const invalidUser = {
      key: 'abc123xyz4567890', // doesn't start with usr:
      date_created: Date.now(),
      last_updated: Date.now(),
      version: 0,
      status: BaseStatus.Active,
      email: 'user@example.com',
      ip_address: '192.168.1.1',
      email_verified: false,
      roles: 'user',
    };

    const result = UserSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
  });

  test('should validate User with multiple addresses', () => {
    const user = {
      key: 'usr:12xyz4567890',
      date_created: Date.now(),
      last_updated: Date.now(),
      version: 0,
      status: BaseStatus.Active,
      email: 'user@example.com',
      ip_address: '192.168.1.1',
      email_verified: false,
      roles: 'user',
      addresses: [
        {
          addr1: '123 Main St',
          city: 'Seattle',
          state: 'WA',
          zip: '98101',
        },
        {
          addr1: '456 Oak Ave',
          city: 'Portland',
          state: 'OR',
          zip: '97201',
        },
      ],
    };

    const result = UserSchema.safeParse(user);
    expect(result.success).toBe(true);
  });

  test('should validate minimal User (required fields only)', () => {
    const minimalUser = {
      key: 'usr:12xyz4567890',
      date_created: Date.now(),
      last_updated: Date.now(),
      version: 0,
      status: BaseStatus.New,
      email: 'minimal@example.com',
      ip_address: '127.0.0.1',
      email_verified: false,
      roles: 'user',
    };

    const result = UserSchema.safeParse(minimalUser);
    expect(result.success).toBe(true);
  });
});

describe('Contact Model', () => {
  test('should validate a complete Contact object', () => {
    const validContact = {
      key: 'con:12xyz4567890',
      date_created: Date.now(),
      last_updated: Date.now(),
      version: 0,
      status: BaseStatus.Active,
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane.smith@example.com',
      phone: '+9876543210',
      ip_address: '10.0.0.1',
      email_verified: true,
      details: { source: 'referral' },
    };

    const result = ContactSchema.safeParse(validContact);
    expect(result.success).toBe(true);
  });

  test('should enforce key starts with "con:"', () => {
    const invalidContact = {
      key: 'abc123xyz4567890', // doesn't start with con:
      date_created: Date.now(),
      last_updated: Date.now(),
      version: 0,
      status: BaseStatus.Active,
      email: 'contact@example.com',
      ip_address: '192.168.1.1',
      email_verified: false,
    };

    const result = ContactSchema.safeParse(invalidContact);
    expect(result.success).toBe(false);
  });

  test('should validate minimal Contact (required fields only)', () => {
    const minimalContact = {
      key: 'con:12xyz4567890',
      date_created: Date.now(),
      last_updated: Date.now(),
      version: 0,
      status: BaseStatus.New,
      email: 'minimal@example.com',
      ip_address: '127.0.0.1',
      email_verified: false,
    };

    const result = ContactSchema.safeParse(minimalContact);
    expect(result.success).toBe(true);
  });
});
