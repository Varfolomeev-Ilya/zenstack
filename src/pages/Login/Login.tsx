'use client';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '@/constants';
import AuthForm from '@/shared/AuthForm/AuthForm';
import AuthLayoutWrapper from '@/shared/AuthLayoutWrapper';

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
    <AuthLayoutWrapper>
      <AuthForm
        title={t('login.title')}
        googleBtnTxt={t('login.loginWithGoogle')}
        submitBtnTxt={t('login.loginBtn')}
        linksArr={links}
      />
    </AuthLayoutWrapper>
  );
};

export default Login;
