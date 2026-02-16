'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, KeySquare } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { loginFormSchema, TLoginFormInputs } from './Login.constants';

import { signInWithEmail, signInWithGoogle } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';
import AppLink from '@/shared/AppLink';
import AuthLayoutWrapper from '@/shared/AuthLayoutWrapper';
import FormInput from '@/shared/FormInput';

const Login = () => {
  const { t } = useTranslation('auth');

  const { control, handleSubmit } = useForm<TLoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TLoginFormInputs> = async data => {
    try {
      const { email, password } = data;
      const response = await signInWithEmail(email, password);

      if (response.data.session) {
        navigate(ROUTES.HOME);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayoutWrapper>
      <>
        <h1 className="mb-5 text-h3 text-foreground">{t('login.title')}</h1>

        <div className="flex flex-col w-full ">
          <Button variant="outline" onClick={signInWithGoogle}>
            {t('login.loginWithGoogle')}
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

          <div className="flex items-center justify-between text-muted-foreground text-sm">
            <p>{t('login.noAccountYet')}</p>
            <AppLink title={t('login.registration')} path={ROUTES.SIGN_UP} />
          </div>
          <div className="flex items-center justify-between text-muted-foreground text-sm">
            <p>{t('login.forgotPassword')}</p>
            <AppLink title={t('login.recoverPassword')} path={ROUTES.FORGOT_PASSWORD} />
          </div>

          <Button variant="secondary" type="submit">
            {t('login.loginBtn')}
          </Button>
        </form>
      </>
    </AuthLayoutWrapper>
  );
};

export default Login;
