import React from 'react';

import Styles from './styles.scss';

type ErrorProps = {
  message: string;
};

const Error: React.FC<ErrorProps> = (props) => {
  return <span className={Styles.errorWrapper}>{props.message}</span>;
};

export default Error;
