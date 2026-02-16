import * as z from 'zod';

import { emailValidation } from '@/utils/checkEmailValidity';
import { passwordValidation } from '@/utils/checkPasswordValidity';

interface IAuthFormProps {
  title: string;
  googleBtnTxt: string;
  submitBtnTxt: string;
  linksArr: { helperTxt: string; title: string; path: string }[];
}

const authFormSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

type TAuthFormValues = z.infer<typeof authFormSchema>;

export { authFormSchema, type TAuthFormValues, type IAuthFormProps };
