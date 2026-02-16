import * as z from 'zod';

import { emailValidation } from '@/utils/checkEmailValidity';
import { passwordValidation } from '@/utils/checkPasswordValidity';

export const loginFormSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export type TLoginFormValues = z.infer<typeof loginFormSchema>;
