import { z } from 'zod';

export const AddressSchema = z.object({
  addr1: z.string(),
  addr2: z.string().optional(),
  addr3: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  latlng: z.tuple([z.number(), z.number()]).optional(),
});

export type Address = z.infer<typeof AddressSchema>;
