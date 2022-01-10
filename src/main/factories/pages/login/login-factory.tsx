import React from 'react';
import { Login } from '@/presentation/pages';
import {
  createRemoteAuthentication,
  createLoginValidation,
  createLocalStoreAccessToken,
} from '@/main/factories';

export const createLogin: React.FC = () => {
  return (
    <Login
      authentication={createRemoteAuthentication()}
      validation={createLoginValidation()}
      storeAccessToken={createLocalStoreAccessToken()}
    />
  );
};
