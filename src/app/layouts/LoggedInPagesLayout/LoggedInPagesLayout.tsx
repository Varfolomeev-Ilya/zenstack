'use client';

import { Suspense, useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { useAuthStore } from '@/features/auth/model/auth.store';
import { supabase } from '@/shared/api/supabase';
import { SidebarProvider, SidebarTrigger } from '@/shared/ui/sidebar';
import { Spinner } from '@/shared/ui/spinner';
import Header from '@/widgets/Header/Header';
import { AppSidebar } from '@/widgets/Sidebar/AppSidebar';

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
      {userId && <Header />}

      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <Suspense fallback={<Spinner className="absolute top-1/2 left-1/2 size-10 text-primary" />}>
          <Outlet />
        </Suspense>
      </SidebarProvider>
    </>
  );
};

export default LoggedInPagesLayout;
