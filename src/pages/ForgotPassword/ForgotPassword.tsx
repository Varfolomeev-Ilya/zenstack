import { useState } from 'react';

import { Mail } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { resetPasswordForEmail } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';
import AppLink from '@/shared/AppLink';
import AuthLayoutWrapper from '@/shared/AuthLayoutWrapper';
import FormInput from '@/shared/FormInput';

const ForgotPassword = () => {
  const { control, watch, handleSubmit } = useForm<{ email: string }>();

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const onSubmit: SubmitHandler<{ email: string }> = async data => {
    setIsLoading(true);
    try {
      await resetPasswordForEmail(data.email, window.location.origin + ROUTES.UPDATE_PASSWORD);

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
    <AuthLayoutWrapper>
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
    </AuthLayoutWrapper>
  );
};

export default ForgotPassword;
