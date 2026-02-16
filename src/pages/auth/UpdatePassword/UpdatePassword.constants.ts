import i18next from 'i18next';
import * as z from 'zod';

import { passwordValidation } from '@/features/auth/lib/checkPasswordValidity';

export const updatePasswordSchema = z
  .object({
    password: passwordValidation,
    confirmPassword: passwordValidation,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: i18next.t('errors:PASSWORD_DID_NOT_MATCH'),
    path: ['confirmPassword'],
  });

export type IUpdatePasswordValues = z.infer<typeof updatePasswordSchema>;
