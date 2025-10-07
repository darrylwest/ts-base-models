import { z } from 'zod';

export const UserPasswordSchema = z.object({
  user_key: z.string().length(16).startsWith('usr:'),
  password_hash: z.string(),
  date_created: z.number(),
  last_updated: z.number(),
  salt: z.string().optional(),
});

export type UserPassword = z.infer<typeof UserPasswordSchema>;

export const UserPasswordMap = z.map(z.string(), UserPasswordSchema);
