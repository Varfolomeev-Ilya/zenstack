'use client';
import { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, KeySquare } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { authFormSchema, IAuthFormProps, TAuthFormValues } from './AuthForm.constants';

import { signInWithGoogle } from '@/features/auth/api/authApi';
import { ROUTES } from '@/shared/constants';
import AppLink from '@/shared/ui/AppLink';
import { Button } from '@/shared/ui/button';
import FormInput from '@/shared/ui/FormInput';

const AuthForm: FC<IAuthFormProps> = ({
  title,
  googleBtnTxt,
  submitBtnTxt,
  linksArr,
  authCallBack,
}) => {
  const { t } = useTranslation('auth');

  const { control, handleSubmit } = useForm<TAuthFormValues>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TAuthFormValues> = async data => {
    try {
      const { email, password } = data;
      const response = await authCallBack(email, password);

      if (response.data.session) {
        navigate(ROUTES.HOME);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="mb-5 text-h3 text-foreground">{title}</h1>

      <div className="flex flex-col w-full ">
        <Button variant="outline" onClick={signInWithGoogle}>
          {googleBtnTxt}
        </Button>
      </div>

      <div className="flex w-full items-center">
        <hr className="flex-1 border-border" />
        <span className="px-4 text-muted-foreground text-sm">{t('common:span')}</span>
        <hr className="flex-1 border-border" />
      </div>

      <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <FormInput
            name="email"
            control={control}
            label={t('common:inputs.emailInput.label')}
            placeholder={t('common:inputs.emailInput.placeholder')}
            LeftIcon={Mail}
            type="email"
          />
          <FormInput
            name="password"
            control={control}
            label={t('common:inputs.passwordInput.label')}
            placeholder={t('common:inputs.passwordInput.placeholder')}
            LeftIcon={KeySquare}
            type="password"
          />
        </div>

        {linksArr.map(({ helperTxt, title, path }, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between text-muted-foreground text-sm"
          >
            <p>{helperTxt}</p>
            <AppLink title={title} path={path} />
          </div>
        ))}

        <Button variant="secondary" type="submit">
          {submitBtnTxt}
        </Button>
      </form>
    </>
  );
};

export default AuthForm;
