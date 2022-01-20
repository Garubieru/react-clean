import React from 'react';
import { useApi } from '@/presentation/context/api/api-context';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  element: JSX.Element;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { getLoginAccount } = useApi();

  return getLoginAccount() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
