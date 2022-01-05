import { useForm } from '@/presentation/context/form/form-context';
import React from 'react';

import Styles from './styles.scss';

const Error: React.FC = () => {
  const { errorState } = useForm();
  const { main } = errorState;
  const visibility = main ? 'visible' : 'hidden';
  return (
    <span
      data-testid="error-msg"
      className={`${Styles.errorWrapper} ${Styles[visibility]}`}
    >
      {main}
    </span>
  );
};

export default Error;
