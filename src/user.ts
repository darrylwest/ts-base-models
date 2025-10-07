import { z } from 'zod';
import { PersonSchema } from './person.js';
import { AddressSchema } from './address.js';

export const UserSchema = PersonSchema.extend({
  key: z.string().length(16).startsWith('usr:'),
  roles: z.string(),
  preferences: z.record(z.string(), z.string()).optional(),
  company_name: z.string().optional(),
  addresses: z.array(AddressSchema).optional(),
});

export type User = z.infer<typeof UserSchema>;

export const UserMap = z.map(z.string(), UserSchema);
