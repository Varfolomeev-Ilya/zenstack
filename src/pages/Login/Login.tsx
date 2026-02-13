'use client';
import { Mail, KeySquare } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { signInWithEmail, signInWithGoogle } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';
import AppLink from '@/shared/AppLink';
import AuthLayoutWrapper from '@/shared/AuthLayoutWrapper';
import FormInput from '@/shared/FormInput';

interface ILoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { t } = useTranslation('auth');
  const { control, handleSubmit } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = data => {
    const { email, password } = data;
    signInWithEmail(email, password);
  };

  return (
    <AuthLayoutWrapper>
      <div className="flex flex-col w-full max-w-[540px] p-5 border border-border rounded-[14px]">
        <h1 className="mb-5 text-h3">{t('login.title')}</h1>

        <div className="flex flex-col w-full ">
          <Button variant="outline" onClick={signInWithGoogle}>
            {t('login.loginWithGoogle')}
          </Button>
        </div>

        <div className="flex w-full items-center">
          <hr className="color-gray w-full"></hr>
          <span className="p-4">{t('common:span')}</span>
          <hr className="color-gray w-full"></hr>
        </div>

        <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit(onSubmit)}>
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

          <div className="flex items-center justify-between">
            <p>{t('login.noAccountYet')}</p>
            <AppLink title={t('login.registration')} path={ROUTES.SIGNUP} />
          </div>

          <Button variant="secondary" type="submit">
            {t('login.loginBtn')}
          </Button>
        </form>
      </div>
    </AuthLayoutWrapper>
  );
};

export default Login;
