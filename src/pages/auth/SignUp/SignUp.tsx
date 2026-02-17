import { useTranslation } from 'react-i18next';

import AuthLayout from '@/app/layouts/auth-layout/auth-layout';
import { supabaseAuthClient } from '@/features/auth/api/authApi';
import AuthForm from '@/features/auth/ui/AuthForm/AuthForm';
import { ROUTES } from '@/shared/constants';

const SignUp = () => {
  const { t } = useTranslation('auth');

  const links = [
    {
      helperTxt: t('signUp.hasAccount'),
      title: t('signUp.login'),
      path: ROUTES.LOGIN,
    },
  ];

  return (
    <AuthLayout>
      <AuthForm
        title={t('signUp.title')}
        googleBtnTxt={t('signUp.signUpWithGoogle')}
        submitBtnTxt={t('signUp.signUpBtn')}
        linksArr={links}
        authCallBack={(email, password) => supabaseAuthClient.signUpWithEmail(email, password)}
      />
    </AuthLayout>
  );
};

export default SignUp;
