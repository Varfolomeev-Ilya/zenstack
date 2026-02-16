'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/features/auth/model/auth.store';
import Header from '@/features/auth/ui/Header/Header';
import Toast from '@/features/auth/ui/Toast/Toast';
import { supabase } from '@/shared/api/supabase';
import { useErrToast } from '@/shared/hooks/useErrToast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { setUser, user } = useAuthStore();
  const { showErrToast } = useErrToast();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        showErrToast(error);
        setUser(null);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, showErrToast]);

  return (
    <div className="w-full min-h-full">
      <Toast />
      {user && <Header />}
      <main className=" px-4 py-8 bg-background text-foreground">{children}</main>
    </div>
  );
}
