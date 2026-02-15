import { useState, useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { supabase } from '@/api/supabase';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';
import AuthLayoutWrapper from '@/shared/AuthLayoutWrapper';
import FormInput from '@/shared/FormInput';

interface IUpdatePasswordForm {
  password: string;
  confirmPassword: string;
}
export default function UpdatePassword() {
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm<IUpdatePasswordForm>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate(ROUTES.FORGOT_PASSWORD);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(event => {
      if (event === 'SIGNED_IN') {
        console.log('Session ready for password update');
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const onSubmit: SubmitHandler<IUpdatePasswordForm> = async data => {
    setIsLoading(true);

    try {
      await supabase.auth.updateUser({
        password: data.password,
      });
      setIsSuccess(true);

      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 3000);
    } catch (error) {
      console.error('Update password error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthLayoutWrapper>
      <div className="auth-container">
        {isSuccess ? (
          <>
            <h2 className="text-h3 text-foreground mb-5">
              {t('updatePassword.successfullySent.title')}
            </h2>
            <p className="text-normal text-muted-foreground">
              {t('updatePassword.successfullySent.subtitle')}
            </p>
          </>
        ) : (
          <>
            <h2 className="text-h3 text-foreground mb-5">{t('updatePassword.title')}</h2>

            <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col items-start lg:grid grid-cols-[140px_1fr] gap-1 lg:items-center">
                <span>{t('common:inputs.newPasswordInput.label')}</span>
                <FormInput
                  required
                  type="password"
                  name="password"
                  control={control}
                  placeholder={t('common:inputs.newPasswordInput.placeholder')}
                  minLength={6}
                />
              </div>

              <div className="flex flex-col items-start lg:grid grid-cols-[140px_1fr] gap-1 lg:items-center">
                <span>{t('common:inputs.repeatPasswordInput.label')}</span>
                <FormInput
                  required
                  type="password"
                  name="confirmPassword"
                  control={control}
                  placeholder={t('common:inputs.repeatPasswordInput.placeholder')}
                />
              </div>

              {/* {error && <p className="text-caption text-destructive">{error}</p>} */}

              <Button
                className="text-normal-demi"
                variant="secondary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading
                  ? t('updatePassword.sendBtnText.sending')
                  : t('updatePassword.sendBtnText.send')}
              </Button>
            </form>
          </>
        )}
      </div>
    </AuthLayoutWrapper>
  );
}
