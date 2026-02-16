import { useTranslation } from 'react-i18next';

import AuthLayoutWrapper from '@/app/layouts/AuthLayoutWrapper/AuthLayoutWrapper';
import { signUpWithEmail } from '@/features/auth/api/authApi';
import AuthForm from '@/features/auth/ui/AuthForm/AuthForm';
import { CONFIRM_EMAIL_LINK, ROUTES } from '@/shared/constants';

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
    <AuthLayoutWrapper>
      <AuthForm
        title={t('signUp.title')}
        googleBtnTxt={t('signUp.signUpWithGoogle')}
        submitBtnTxt={t('signUp.signUpBtn')}
        linksArr={links}
        authCallBack={(email, password) => signUpWithEmail(email, password, CONFIRM_EMAIL_LINK)}
      />
    </AuthLayoutWrapper>
  );
};

export default SignUp;
