'use client';
import { useEffect } from 'react';

import { supabase } from '@/shared/api/supabase';
import { ROUTES } from '@/shared/constants/index';

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
