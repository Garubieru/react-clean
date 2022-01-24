import React from 'react';
import { Signup } from '@/presentation/pages';

import { createRemoteSignup, createSignupValidation } from '@/main/factories';

export const CreateSignup: React.FC = () => {
  return (
    <Signup remoteSignup={createRemoteSignup()} validations={createSignupValidation()} />
  );
};
