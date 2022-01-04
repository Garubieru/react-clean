import React, { memo } from 'react';
import Logo from '../../atoms/logo';
import Styles from './styles.scss';

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
      <div className={Styles.logoWrapper}>
        <Logo />
        <h1>4Dev - Surveys for programmers</h1>
      </div>
    </header>
  );
};

export default memo(LoginHeader);
