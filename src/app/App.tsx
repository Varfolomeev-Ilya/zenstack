'use client';

import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import LoggedInPagesLayout from './layouts/LoggedInPagesLayout/LoggedInPagesLayout';
import NotLoggedInPagesLayout from './layouts/NotLoggedInPagesLayout/NotLoggedInPagesLayout';

import { useAuthStore } from '@/features/auth/model/auth.store';
import Toast from '@/features/auth/ui/Toast/Toast';
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
    return <Spinner />;
  }

  return (
    <>
      <Toast />
      <main className="px-4 py-8 bg-background text-foreground">
        {AUTH_ROUTES.includes(location.pathname) ? (
          <NotLoggedInPagesLayout />
        ) : (
          <LoggedInPagesLayout />
        )}
      </main>
    </>
  );
}

export default App;
