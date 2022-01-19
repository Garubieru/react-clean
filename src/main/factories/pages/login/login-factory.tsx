import React from 'react';
import { Login } from '@/presentation/pages';
import { createRemoteAuthentication, createLoginValidation } from '@/main/factories';

export const CreateLogin: React.FC = () => {
  return (
    <Login
      authentication={createRemoteAuthentication()}
      validation={createLoginValidation()}
    />
  );
};
