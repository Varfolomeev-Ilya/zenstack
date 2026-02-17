'use client';

import { Suspense, useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { useAuthStore } from '@/features/auth/model/auth.store';
import { supabase } from '@/shared/api/supabase';
import { SidebarProvider, SidebarTrigger } from '@/shared/ui/sidebar/sidebar';
import { Spinner } from '@/shared/ui/spinner/spinner';
import { AppSidebar } from '@/widgets/app-sidebar/app-sidebar';
import Header from '@/widgets/Header/Header';

const LoggedInPagesLayout = () => {
  const { setUserId, userId } = useAuthStore();

  useEffect(() => {
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
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <div className="relative flex h-full flex-1 flex-col">
          {userId && <Header />}

          <Suspense
            fallback={<Spinner className="absolute top-1/2 left-1/2 size-10 text-primary" />}
          >
            <Outlet />
          </Suspense>
        </div>
      </SidebarProvider>
    </>
  );
};

export default LoggedInPagesLayout;
