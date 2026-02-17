import { useState, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { IUpdatePasswordValues, updatePasswordSchema } from './UpdatePassword.constants';

import AuthLayout from '@/app/layouts/auth-layout/auth-layout';
import { supabaseAuthClient } from '@/features/auth/api/authApi';
import { supabase } from '@/shared/api/supabase';
import { ROUTES } from '@/shared/constants';
import { Button } from '@/shared/ui/button/button';
import FormInput from '@/shared/ui/form-input/form-input';

export default function UpdatePassword() {
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm<IUpdatePasswordValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const session = await supabaseAuthClient.getSession();
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

  const onSubmit: SubmitHandler<IUpdatePasswordValues> = async data => {
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
    <AuthLayout>
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
                <span className="p-0 lg:pb-4">{t('common:inputs.newPasswordInput.label')}</span>
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
                <span className="p-0 lg:pb-4">{t('common:inputs.repeatPasswordInput.label')}</span>
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
    </AuthLayout>
  );
}
