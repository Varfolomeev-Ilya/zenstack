import { useEffect } from 'react';

import { supabase } from '@api/supabase';
import { ROUTES } from '@constants/index';

function AuthCallback() {
  useEffect(() => {
    const handleAuthCallback = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        window.location.href = ROUTES.LOGIN;
        return;
      }

      if (session) {
        window.location.href = ROUTES.HOME;
      }
    };

    handleAuthCallback();
  }, []);

  return <div>Обработка входа...</div>;
}

export default AuthCallback;
