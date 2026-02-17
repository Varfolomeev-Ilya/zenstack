import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { forgotPasswordSchema, TForgotPasswordFormValues } from './ForgotPassword.constants';

import AuthLayout from '@/app/layouts/auth-layout/auth-layout';
import { supabaseAuthClient } from '@/features/auth/api/authApi';
import { ROUTES } from '@/shared/constants';
import AppLink from '@/shared/ui/app-link/app-link';
import { Button } from '@/shared/ui/button/button';
import FormInput from '@/shared/ui/form-input/form-input';

const ForgotPassword = () => {
  const { control, watch, handleSubmit } = useForm<TForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const onSubmit: SubmitHandler<TForgotPasswordFormValues> = async data => {
    setIsLoading(true);
    try {
      await supabaseAuthClient.resetPasswordForEmail(data.email);

      setIsSent(true);
      localStorage.setItem('resetEmail', data.email);
    } catch (error) {
      console.error('Reset password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const email = watch('email');

  return (
    <AuthLayout>
      <div className="flex flex-col gap-2">
        {isSent ? (
          <>
            <h2 className="text-h3 text-foreground">{t('forgotPassword.titleSent')}</h2>
            <p className="text-normal text-muted-foreground">
              {t('forgotPassword.subtitleSent')} <strong>{email}</strong>
            </p>
            <Button variant="secondary" onClick={() => setIsSent(false)}>
              {t('forgotPassword.sendAgain')}
            </Button>
          </>
        ) : (
          <>
            <h2 className="text-h3 text-foreground">{t('forgotPassword.title')}</h2>
            <p className="text-normal text-muted-foreground">{t('forgotPassword.subtitle')}</p>

            <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                name="email"
                control={control}
                label={t('common:inputs.emailInput.label')}
                placeholder={t('common:inputs.emailInput.placeholder')}
                LeftIcon={Mail}
                type="email"
              />

              <div className="flex items-center justify-between">
                <Button
                  className="text-normal-demi"
                  variant="secondary"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading
                    ? t('forgotPassword.resendBtn.sending')
                    : t('forgotPassword.resendBtn.resend')}
                </Button>
                <AppLink title={t('forgotPassword.returnToLogin')} path={ROUTES.LOGIN} />
              </div>
            </form>
          </>
        )}
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
