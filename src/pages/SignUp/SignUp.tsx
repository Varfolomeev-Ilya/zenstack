import { Mail, KeySquare } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import AuthLayoutWrapper from '@/shared/AuthLayoutWrapper';
import FormInput from '@/shared/FormInput';

interface ILoginForm {
  email: string;
  password: string;
}

const SignUp = () => {
  const { t } = useTranslation('auth');
  const { control, handleSubmit } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = data => {
    const { email, password } = data;
    console.log(email, password);
  };

  return (
    <AuthLayoutWrapper>
      <div className="flex flex-col w-full max-w-[540px] p-5 border border-border rounded-[14px]">
        <h1 className="mb-5 text-h3">{t('signUp.title')}</h1>

        <div className="flex flex-col w-full mb-5">
          <Button variant="outline" onClick={() => null}>
            {t('signUp.signUpWithGoogle')}
          </Button>
        </div>

        <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name="email"
            control={control}
            label="Email"
            placeholder="email"
            LeftIcon={Mail}
            type="email"
          />
          <FormInput
            name="password"
            control={control}
            label="Password"
            placeholder="password"
            LeftIcon={KeySquare}
            type="password"
          />

          <Button variant="secondary" type="submit">
            {t('signUp.signUpBtn')}
          </Button>
        </form>
      </div>
    </AuthLayoutWrapper>
  );
};

export default SignUp;
