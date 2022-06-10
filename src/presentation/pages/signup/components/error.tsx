import React from 'react';
import { useRecoilValue } from 'recoil';
import { Error as BaseError } from '@/presentation/components';
import { signupState } from './atoms';

const Error: React.FC = () => {
  const state = useRecoilValue(signupState);
  return <BaseError errorMsg={state.mainError} />;
};

export default Error;
