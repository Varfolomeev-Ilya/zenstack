'use client';
import { useTranslation } from 'react-i18next';

import AuthLayout from '@/app/layouts/auth-layout/auth-layout';
import { supabaseAuthClient } from '@/features/auth/api/authApi';
import AuthForm from '@/features/auth/ui/AuthForm/AuthForm';
import { ROUTES } from '@/shared/constants';

const Login = () => {
  const { t } = useTranslation('auth');

  const links = [
    {
      helperTxt: t('login.noAccountYet'),
      title: t('login.registration'),
      path: ROUTES.SIGN_UP,
    },
    {
      helperTxt: t('login.forgotPassword'),
      title: t('login.forgotPassword'),
      path: ROUTES.FORGOT_PASSWORD,
    },
  ];

  return (
    <AuthLayout>
      <AuthForm
        title={t('login.title')}
        googleBtnTxt={t('login.loginWithGoogle')}
        submitBtnTxt={t('login.loginBtn')}
        linksArr={links}
        authCallBack={(email, password) => supabaseAuthClient.signInWithEmail(email, password)}
      />
    </AuthLayout>
  );
};

export default Login;
