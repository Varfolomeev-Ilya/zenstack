import { useTranslation } from 'react-i18next';

import { ROUTES } from '@/constants';
import AuthForm from '@/shared/AuthForm/AuthForm';
import AuthLayoutWrapper from '@/shared/AuthLayoutWrapper';

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
      />
    </AuthLayoutWrapper>
  );
};

export default SignUp;
