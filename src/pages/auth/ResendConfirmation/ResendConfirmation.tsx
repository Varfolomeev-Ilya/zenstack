import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  resendConfirmationSchema,
  TResendConfirmationFormValues,
} from './ResendConfirmation.constants';

import { supabaseAuthClient } from '@/features/auth/api/authApi';
import { Button } from '@/shared/ui/button';
import FormInput from '@/shared/ui/FormInput';

const ResendConfirmation = () => {
  const { t } = useTranslation('auth');

  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const { control, handleSubmit } = useForm<TResendConfirmationFormValues>({
    resolver: zodResolver(resendConfirmationSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<TResendConfirmationFormValues> = async data => {
    setLoading(true);
    try {
      const savedEmail = localStorage.getItem('pendingEmail') || data.email;

      if (!savedEmail) {
        return;
      }

      await supabaseAuthClient.resendConfirmationEmail(savedEmail);

      setIsSent(true);
      localStorage.setItem('pendingEmail', savedEmail);
    } catch (error) {
      console.error('Resend confirmation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-h3">
        {isSent ? t('resendConfirmation.titleSent') : t('resendConfirmation.title')}
      </h2>
      <p className="text-normal text-muted-foreground">
        {isSent ? t('resendConfirmation.subtitleSent') : t('resendConfirmation.subtitle')}
      </p>

      {!isSent && (
        <div className="flex flex-col gap-2">
          <FormInput
            type="email"
            name="email"
            placeholder={t('common:inputs.emailInput.placeholder')}
            label={t('common:inputs.emailInput.label')}
            control={control}
            LeftIcon={Mail}
          />
          <Button type="submit" className="text-normal-demi" variant="outline" disabled={loading}>
            {loading
              ? t('resendConfirmation.resendBtn.sending')
              : t('resendConfirmation.resendBtn.resend')}
          </Button>
        </div>
      )}
    </form>
  );
};

export default ResendConfirmation;
