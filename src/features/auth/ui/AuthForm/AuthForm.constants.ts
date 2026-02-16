import { TAuthResponse } from '@features/auth/model/types';
import * as z from 'zod';

import { emailValidation } from '@/features/auth/lib/checkEmailValidity';
import { passwordValidation } from '@/features/auth/lib/checkPasswordValidity';

interface IAuthFormProps {
  title: string;
  googleBtnTxt: string;
  submitBtnTxt: string;
  linksArr: { helperTxt: string; title: string; path: string }[];
  authCallBack: (email: string, password: string) => Promise<TAuthResponse>;
}

const authFormSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

type TAuthFormValues = z.infer<typeof authFormSchema>;

export { authFormSchema, type TAuthFormValues, type IAuthFormProps };
