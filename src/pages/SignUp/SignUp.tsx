import { Mail, KeySquare } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { signUpWithEmail } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { CONFIRM_EMAIL_LINK, ROUTES } from '@/constants';
import AppLink from '@/shared/AppLink';
import AuthLayoutWrapper from '@/shared/AuthLayoutWrapper';
import FormInput from '@/shared/FormInput';

interface ILoginForm {
  email: string;
  password: string;
}

const SignUp = () => {
  const { t } = useTranslation('auth');
  const { control, handleSubmit } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = async data => {
    try {
      const { email, password } = data;
      localStorage.setItem('pendingEmail', email);

      await signUpWithEmail(email, password, CONFIRM_EMAIL_LINK);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayoutWrapper>
      <>
        <h1 className="mb-5 text-h3 text-foreground">{t('signUp.title')}</h1>

        <div className="flex flex-col w-full">
          <Button variant="outline" onClick={() => null}>
            {t('signUp.signUpWithGoogle')}
          </Button>
        </div>

        <div className="flex w-full items-center">
          <hr className="flex-1 border-border" />
          <span className="px-4 text-muted-foreground text-sm">{t('common:span')}</span>
          <hr className="flex-1 border-border" />
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

          <div className="flex items-center justify-between text-muted-foreground text-sm">
            <p>{t('signUp.hasAccount')}</p>
            <AppLink title={t('signUp.login')} path={ROUTES.LOGIN} />
          </div>

          <Button variant="secondary" type="submit">
            {t('signUp.signUpBtn')}
          </Button>
        </form>
      </>
    </AuthLayoutWrapper>
  );
};

export default SignUp;
