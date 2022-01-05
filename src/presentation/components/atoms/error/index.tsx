import { useForm } from '@/presentation/context/form/form-context';
import React from 'react';

import Styles from './styles.scss';

const Error: React.FC = () => {
  const { state } = useForm();
  const visibility = state.mainError ? 'visible' : 'hidden';
  return (
    <span
      data-testid="error-msg"
      className={`${Styles.errorWrapper} ${Styles[visibility]}`}
    >
      {state.mainError}
    </span>
  );
};

export default Error;
