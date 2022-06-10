import React from 'react';
import { useRecoilState } from 'recoil';
import { Input as BaseInput } from '@/presentation/components';
import { signupState } from './atoms';

type InputProps = {
  name: string;
  type: string;
  placeholder: string;
};

const Input: React.FC<InputProps> = ({ name, type, placeholder }) => {
  const [state, setState] = useRecoilState(signupState);
  return (
    <BaseInput
      name={name}
      type={type}
      placeholder={placeholder}
      state={state}
      setState={setState}
    />
  );
};

export default Input;
