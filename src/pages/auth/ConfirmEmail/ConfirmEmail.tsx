import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import ResendConfirmation from '../ResendConfirmation/ResendConfirmation';

import AuthLayout from '@/app/layouts/AuthLayoutWrapper/auth-layout';
import { supabaseAuthClient } from '@/features/auth/api/authApi';
import { supabase } from '@/shared/api/supabase';
import { ROUTES } from '@/shared/constants';
import { useErrToast } from '@/shared/hooks/useErrToast';
import { Button } from '@/shared/ui/button/button';

const ConfirmEmail = () => {
  const { t } = useTranslation('auth');

  const { showErrToast } = useErrToast();

  const [status, setStatus] = useState('processing');
  const navigate = useNavigate();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        const response = await supabaseAuthClient.getSession();

        if (response.data.session) {
          setStatus('success');
          setTimeout(() => navigate(ROUTES.HOME), 2000);
        } else {
          const hash = window.location.hash;
          if (hash && hash.includes('access_token')) {
            window.location.reload();
          } else {
            setStatus('expired');
          }
        }
      } catch (error) {
        showErrToast(error);
        setStatus('error');
      }
    };

    handleEmailConfirmation();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (event === 'SIGNED_IN') {
        setStatus('success');
        setTimeout(() => navigate(ROUTES.HOME), 2000);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const getBodyContent = () => {
    if (status === 'processing') {
      return (
        <p className="text-normal text-muted-foreground">{t('confirmEmail.titleProcessing')}</p>
      );
    }
    if (status === 'success') {
      localStorage.removeItem('pendingEmail');
      return <p className="text-normal text-muted-foreground">{t('confirmEmail.titleSuccess')}</p>;
    }
    if (status === 'expired') {
      return <ResendConfirmation />;
    }

    if (status === 'error') {
      return (
        <>
          <p className="text-normal text-muted-foreground">{t('confirmEmail.titleError')}</p>
          <Button
            variant="secondary"
            className="text-normal-demi"
            onClick={() => navigate(ROUTES.SIGN_UP)}
          >
            {t('confirmEmail.tryAgainBtn')}
          </Button>
        </>
      );
    }
  };
  return (
    <AuthLayout>
      <div className="flex flex-col gap-2">{getBodyContent()}</div>
    </AuthLayout>
  );
};

export default ConfirmEmail;
