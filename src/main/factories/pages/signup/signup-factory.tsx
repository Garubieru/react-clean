import React from 'react';
import { Signup } from '@/presentation/pages';

import {
  createLocalStoreLoginAccount,
  createRemoteSignup,
  createSignupValidation,
} from '@/main/factories/usecases';

export const createSignup: React.FC = () => {
  return (
    <Signup
      remoteSignup={createRemoteSignup()}
      validations={createSignupValidation()}
      storeLoginAccount={createLocalStoreLoginAccount()}
    />
  );
};
