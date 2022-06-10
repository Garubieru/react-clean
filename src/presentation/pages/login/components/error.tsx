import React from 'react';
import { useRecoilValue } from 'recoil';
import { Error as BaseError } from '@/presentation/components';
import { loginState } from './atoms';

const Error: React.FC = () => {
  const state = useRecoilValue(loginState);
  return <BaseError errorMsg={state.mainError} />;
};

export default Error;
