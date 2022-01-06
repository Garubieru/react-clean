import React from 'react';
import Styles from './styles.scss';

const Spinner: React.FC = (props) => {
  return (
    <div {...props} data-testid="spinner" className={Styles.spinner}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Spinner;
