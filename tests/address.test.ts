import { describe, expect, test } from 'bun:test';
import { AddressSchema } from '../src/address.js';

describe('Address Model', () => {
  test('should validate a complete Address object', () => {
    const validAddress = {
      addr1: '123 Main St',
      addr2: 'Apt 4B',
      addr3: 'Building C',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
      latlng: [47.6062, -122.3321] as [number, number],
    };

    const result = AddressSchema.safeParse(validAddress);
    expect(result.success).toBe(true);
  });

  test('should validate minimal Address object (without optional fields)', () => {
    const minimalAddress = {
      addr1: '123 Main St',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
    };

    const result = AddressSchema.safeParse(minimalAddress);
    expect(result.success).toBe(true);
  });

  test('should validate Address with only addr2', () => {
    const address = {
      addr1: '123 Main St',
      addr2: 'Suite 100',
      city: 'Portland',
      state: 'OR',
      zip: '97201',
    };

    const result = AddressSchema.safeParse(address);
    expect(result.success).toBe(true);
  });

  test('should validate latlng as tuple', () => {
    const address = {
      addr1: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102',
      latlng: [37.7749, -122.4194] as [number, number],
    };

    const result = AddressSchema.safeParse(address);
    expect(result.success).toBe(true);
  });

  test('should reject missing required fields', () => {
    const incomplete = {
      addr1: '123 Main St',
      city: 'Seattle',
      // missing state and zip
    };

    const result = AddressSchema.safeParse(incomplete);
    expect(result.success).toBe(false);
  });

  test('should reject invalid latlng (not a tuple)', () => {
    const invalidAddress = {
      addr1: '123 Main St',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
      latlng: [47.6062], // should be [number, number]
    };

    const result = AddressSchema.safeParse(invalidAddress);
    expect(result.success).toBe(false);
  });
});
