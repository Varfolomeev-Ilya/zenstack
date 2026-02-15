import { lazy } from 'react';

import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '../App';
import { ROUTES } from '../constants/index';

import PrivateRoute from './PrivateRoute';

const LoginPage = lazy(() => import('../pages/Login/Login'));
const SignUpPage = lazy(() => import('../pages/SignUp/SignUp'));
const AuthCallbackPage = lazy(() => import('../pages/AuthCallback/AuthCallback'));
const ConfirmEmailPage = lazy(() => import('../pages/ConfirmEmail/ConfirmEmail'));
const LinkExpiredPage = lazy(() => import('../pages/LinkExpired/LinkExpired'));
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPassword/ForgotPassword'));
const UpdatePasswordPage = lazy(() => import('../pages/UpdatePassword/UpdatePassword'));

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
