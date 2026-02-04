import { FC } from 'react';

import { Navigate } from 'react-router-dom';

import { ROUTES } from '../constants/index';

interface IPrivateRouteProps {
  Component: React.ComponentType;
}
const PrivateRoute: FC<IPrivateRouteProps> = ({ Component }) => {
  const user = false;

  if (!user) {
    return <Navigate replace to={ROUTES.LOGIN} />;
  }

  return <Component />;
};

export default PrivateRoute;
