import React from 'react';
import { LoginHeader, Footer } from '@/presentation/components';
import Styles from './styles.scss';

const PageWrapper: React.FC = (props) => {
  return (
    <div className={Styles.pageWrapper}>
      <LoginHeader />
      <div className={Styles.pageContent}>{props.children}</div>
      <Footer />
    </div>
  );
};

export default PageWrapper;
