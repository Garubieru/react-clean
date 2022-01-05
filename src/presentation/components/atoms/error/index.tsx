import { useForm } from '@/presentation/context/form/form-context';
import React from 'react';

import Styles from './styles.scss';

const Error: React.FC = () => {
  const { errorMsg } = useForm();
  const visibility = errorMsg ? 'visible' : 'hidden';
  return (
    <span
      data-testid="error-msg"
      className={`${Styles.errorWrapper} ${Styles[visibility]}`}
    >
      {errorMsg}
    </span>
  );
};

export default Error;
