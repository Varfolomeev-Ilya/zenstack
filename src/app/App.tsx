'use client';

import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import LoggedInPages from './layouts/logged-in-pages/logged-in-pages';
import NotLoggedInPages from './layouts/not-logged-in-pages/not-logged-in-pages';

import { useAuthStore } from '@/features/auth/model/auth.store';
import Toast from '@/features/auth/ui/toast/toast';
import { supabase } from '@/shared/api/supabase';
import { AUTH_ROUTES } from '@/shared/constants';
import { Spinner } from '@/shared/ui/spinner/spinner';

function App() {
  const location = useLocation();
  const { setUserId } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      setIsLoading(true);

      const token = localStorage.getItem('token');

      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUserId(session?.user.id);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  if (isLoading) {
    return <Spinner className="absolute top-1/2 left-1/2 size-10 text-primary" />;
  }

  return (
    <>
      <Toast />
      <main className="relative bg-background text-foreground">
        {AUTH_ROUTES.includes(location.pathname) ? <NotLoggedInPages /> : <LoggedInPages />}
      </main>
    </>
  );
}

export default App;
