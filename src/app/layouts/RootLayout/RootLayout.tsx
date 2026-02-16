'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/features/auth/model/auth.store';
import Header from '@/features/auth/ui/Header/Header';
import Toast from '@/features/auth/ui/Toast/Toast';
import { supabase } from '@/shared/api/supabase';
import { useErrToast } from '@/shared/hooks/useErrToast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { setUserId, userId } = useAuthStore();
  const { showErrToast } = useErrToast();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUserId(session?.user.id);
      } catch (error) {
        showErrToast(error);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUserId(session?.user.id);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="w-full min-h-full">
      <Toast />
      {userId && <Header />}
      <main className=" px-4 py-8 bg-background text-foreground">{children}</main>
    </div>
  );
}
