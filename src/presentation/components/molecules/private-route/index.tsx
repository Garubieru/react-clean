import React from 'react';
import { useRecoilValue } from 'recoil';
import { loginApiState } from '@/presentation/context/api/api-state';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  element: JSX.Element;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { getLoginAccount } = useRecoilValue(loginApiState);

  return getLoginAccount() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
