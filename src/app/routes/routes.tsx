import { lazy } from 'react';

import { ROUTES } from '@shared/constants/index';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '../App';

import PrivateRoute from './PrivateRoute';

const LoginPage = lazy(() => import('@/pages/auth/Login/Login'));
const SignUpPage = lazy(() => import('@/pages/auth/SignUp/SignUp'));
const AuthCallbackPage = lazy(() => import('@/pages/auth/AuthCallback/AuthCallback'));
const ConfirmEmailPage = lazy(() => import('@/pages/auth/ConfirmEmail/ConfirmEmail'));
const LinkExpiredPage = lazy(() => import('@/pages/auth/LinkExpired/LinkExpired'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPassword/ForgotPassword'));
const UpdatePasswordPage = lazy(() => import('@/pages/auth/UpdatePassword/UpdatePassword'));

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
        path: ROUTES.SIGN_UP,
        element: <SignUpPage />,
      },
      {
        path: ROUTES.SIGN_UP,
        element: <></>,
      },
      {
        path: ROUTES.HOME,
        element: <PrivateRoute Component={() => <div>Home</div>} />,
      },
      {
        path: ROUTES.CONFIRM_EMAIL,
        element: <ConfirmEmailPage />,
      },
      {
        path: ROUTES.LINK_EXPIRED,
        element: <LinkExpiredPage />,
      },
      {
        path: ROUTES.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
      },
      {
        path: ROUTES.UPDATE_PASSWORD,
        element: <UpdatePasswordPage />,
      },

      {
        path: ROUTES.AUTH_CALLBACK,
        element: <AuthCallbackPage />,
      },
    ],
  },
]);
