import React from 'react';
import { Login } from '@/presentation/pages';
import {
  createRemoteAuthentication,
  createLoginValidation,
  createLocalStoreLoginAccount,
} from '@/main/factories';

export const createLogin: React.FC = () => {
  return (
    <Login
      authentication={createRemoteAuthentication()}
      validation={createLoginValidation()}
      storeLoginAccount={createLocalStoreLoginAccount()}
    />
  );
};
