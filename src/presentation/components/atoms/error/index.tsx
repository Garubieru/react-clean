import React from 'react';
import Styles from './styles.scss';

type ErrorProps = {
  errorMsg: string;
};

const Error: React.FC<ErrorProps> = ({ errorMsg }) => {
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
