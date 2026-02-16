import { useTranslation } from 'react-i18next';

import AuthLayoutWrapper from '@/app/layouts/AuthLayoutWrapper/AuthLayoutWrapper';
import { resendConfirmationEmail } from '@/features/auth/api/authApi';
import { Button } from '@/shared/ui/button';

const LinkExpired = () => {
  const { t } = useTranslation('auth');
  const resendConfirmation = async () => {
    const email = localStorage.getItem('pendingEmail');

    if (email) {
      await resendConfirmationEmail(email);
    }
  };

  return (
    <AuthLayoutWrapper>
      <div className="flex flex-col justify-center gap-3">
        <h1 className="text-h3">{t('linkExpired.title')}</h1>
        <p className="text-normal text-muted-foreground">{t('linkExpired.subtitle')}</p>
        <Button variant="secondary" className="text-normal-demi" onClick={resendConfirmation}>
          {t('linkExpired.resendBtn')}
        </Button>
      </div>
    </AuthLayoutWrapper>
  );
};

export default LinkExpired;
