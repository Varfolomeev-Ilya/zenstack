import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '../App';
import { ROUTES } from '../constants/index';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <></>,
      },
      {
        path: ROUTES.SIGNUP,
        element: <></>,
      },
      {
        path: ROUTES.HOME,
        element: <Navigate to={ROUTES.LOGIN} />,
      },
    ],
  },
]);
