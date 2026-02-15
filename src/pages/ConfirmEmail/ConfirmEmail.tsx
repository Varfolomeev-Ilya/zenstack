import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import ResendConfirmation from '../ResendConfirmation/ResendConfirmation';

import { getSession } from '@/api/auth';
import { supabase } from '@/api/supabase';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';
import AuthLayoutWrapper from '@/shared/AuthLayoutWrapper';

const ConfirmEmail = () => {
  const { t } = useTranslation('auth');

  const [status, setStatus] = useState('processing');
  const navigate = useNavigate();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        const {
          data: { session },
          error,
        } = await getSession();

        if (error) {
          throw error;
        }

        if (session) {
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
        console.error('Confirmation error:', error);
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
    <AuthLayoutWrapper>
      <div className="flex flex-col gap-2">{getBodyContent()}</div>
    </AuthLayoutWrapper>
  );
};

export default ConfirmEmail;
