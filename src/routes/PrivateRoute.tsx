'use-client';
import { FC, useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';

import { supabase } from '@/api/supabase';
import { ROUTES } from '@/constants/index';

interface IPrivateRouteProps {
  Component: React.ComponentType;
}

const PrivateRoute: FC<IPrivateRouteProps> = ({ Component }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(Boolean(session));
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAuthenticated(Boolean(session));
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate replace to={ROUTES.LOGIN} />;
  }

  return <Component />;
};

export default PrivateRoute;
