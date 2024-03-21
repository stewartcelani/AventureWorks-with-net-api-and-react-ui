import { z } from 'zod';
import { guidRegex } from '@/utils';

export const UserClaimsSchema = z.object({
  id: z.string().regex(guidRegex, {
    message: 'id must be a valid GUID'
  }),
  firstName: z.string().min(1, { message: 'firstName cannot be empty' }),
  lastName: z.string().min(1, { message: 'lastName cannot be empty' }),
  email: z.string().email({ message: 'email must be a valid email address' }),
  roles: z.array(z.string()).min(1, { message: 'roles cannot be empty' })
});

export type UserClaims = z.infer<typeof UserClaimsSchema>;
