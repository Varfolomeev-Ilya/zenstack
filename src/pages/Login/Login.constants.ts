import i18n from 'i18next';
import * as z from 'zod';

import { passwordValidation } from '@/utils/checkPasswordValidity';

export const loginFormSchema = z.object({
  email: z
    .email({
      message: i18n.t('errors:INCORRECT_EMAIL'),
    })
    .min(5, i18n.t('errors:EMAIL_MIN_LENGTH'))
    .max(50, i18n.t('errors:EMAIL_MAX_LENGTH')),
  password: passwordValidation,
});

export type TLoginFormInputs = z.infer<typeof loginFormSchema>;
