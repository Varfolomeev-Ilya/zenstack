import { lazy } from 'react';

import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '../App';
import { ROUTES } from '../constants/index';

import PrivateRoute from './PrivateRoute';

const LoginPage = lazy(() => import('../pages/Login/Login'));
const AuthCallbackPage = lazy(() => import('../pages/AuthCallback/AuthCallback'));

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to={ROUTES.LOGIN} /> },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.SIGNUP,
        element: <></>,
      },
      {
        path: ROUTES.HOME,
        element: <PrivateRoute Component={() => <div>Home</div>} />,
      },
      {
        path: '/auth/callback',
        element: <AuthCallbackPage />,
      },
    ],
  },
]);
