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
        <h1 className="mb-5 text-h3">{t('greet')}</h1>

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
            Sign up
          </Button>
        </form>
      </div>
    </AuthLayoutWrapper>
  );
};

export default SignUp;
