import { z } from 'zod';
import { BaseSchema } from './base.js';

export const PersonSchema = BaseSchema.extend({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  ip_address: z.string(),
  details: z.record(z.string(), z.string()).optional(),
  email_verified: z.boolean().default(false),
  verification_key: z.string().optional(),
  verification_expires_at: z.number().optional(),
  verification_sent_at: z.number().optional(),
});

export type Person = z.infer<typeof PersonSchema>;
