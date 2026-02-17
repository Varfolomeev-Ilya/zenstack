import * as z from 'zod';

import { emailValidation } from '@/features/auth/lib/checkEmailValidity';

export const resendConfirmationSchema = z.object({
  email: emailValidation,
});

export type TResendConfirmationFormValues = z.infer<typeof resendConfirmationSchema>;
