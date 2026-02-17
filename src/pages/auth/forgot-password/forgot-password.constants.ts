import * as z from 'zod';

import { emailValidation } from '@/features/auth/lib/checkEmailValidity';

export const forgotPasswordSchema = z.object({
  email: emailValidation,
});

export type TForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
