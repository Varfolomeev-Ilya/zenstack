'use client';
import { useTranslation } from 'react-i18next';

import { signInWithGoogle } from '@/api/auth';

const Login = () => {
  const { t } = useTranslation('auth');
  return (
    <div>
      <button onClick={signInWithGoogle}>Login with Google</button>
      <h1>Login</h1>
      <p>{t('greet')}</p>
    </div>
  );
};

export default Login;
