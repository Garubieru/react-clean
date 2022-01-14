import React from 'react';
import { Signup } from '@/presentation/pages';

import {
  createLocalStoreAccessToken,
  createRemoteSignup,
  createSignupValidation,
} from '@/main/factories/usecases';

export const createSignup: React.FC = () => {
  return (
    <Signup
      remoteSignup={createRemoteSignup()}
      validations={createSignupValidation()}
      storeAccessToken={createLocalStoreAccessToken()}
    />
  );
};
