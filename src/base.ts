import { z } from 'zod';

/* eslint-disable no-unused-vars */
export enum BaseStatus {
  New = 'new',
  Pending = 'pending',
  Active = 'active',
  Inactive = 'inactive',
  Verified = 'verified', // Future use
  Deleted = 'deleted',
  Shipped = 'shipped', // Future use
  Completed = 'completed', // Future use
}
/* eslint-enable no-unused-vars */

export const BaseSchema = z.object({
  key: z.string().length(16),
  date_created: z.number(),
  last_updated: z.number(),
  version: z.number().gte(0),
  status: z.nativeEnum(BaseStatus),
});

export type Base = z.infer<typeof BaseSchema>;
