import { lazy } from 'react';

import { ROUTES } from '@shared/constants/index';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '../App';

import PrivateRoute from './private-route';

const LoginPage = lazy(() => import('@/pages/auth/login/login'));
const SignUpPage = lazy(() => import('@/pages/auth/sign-up/sign-up'));
const AuthCallbackPage = lazy(() => import('@/pages/auth/auth-callback/auth-callback'));
const ConfirmEmailPage = lazy(() => import('@/pages/auth/confirm-email/confirm-email'));
const LinkExpiredPage = lazy(() => import('@/pages/auth/link-expired/link-expired'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/forgot-password/forgot-password'));
const UpdatePasswordPage = lazy(() => import('@/pages/auth/update-password/update-password'));

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
        element: <PrivateRoute Component={() => <div></div>} />,
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
