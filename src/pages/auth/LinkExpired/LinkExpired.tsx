import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import AuthLayout from '@/app/layouts/auth-layout/auth-layout';
import { supabaseAuthClient } from '@/features/auth/api/authApi';
import { useErrToast } from '@/shared/hooks/useErrToast';
import { Button } from '@/shared/ui/button/button';

const LinkExpired = () => {
  const { t } = useTranslation('auth');

  const { showErrToast } = useErrToast();

  const [isLoading, setIsLoading] = useState(false);

  const resendConfirmation = async () => {
    setIsLoading(true);

    try {
      const email = localStorage.getItem('pendingEmail');

      if (email) {
        await supabaseAuthClient.resendConfirmationEmail(email);
      }
    } catch (error) {
      showErrToast(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col justify-center gap-3">
        <h1 className="text-h3">{t('linkExpired.title')}</h1>
        <p className="text-normal text-muted-foreground">{t('linkExpired.subtitle')}</p>
        <Button
          variant="secondary"
          className="text-normal-demi"
          disabled={isLoading}
          onClick={resendConfirmation}
        >
          {t('linkExpired.resendBtn')}
        </Button>
      </div>
    </AuthLayout>
  );
};

export default LinkExpired;
