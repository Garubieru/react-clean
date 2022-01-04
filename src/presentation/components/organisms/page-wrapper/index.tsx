import React from 'react';
import LoginHeader from '@/presentation/components/molecules/login-header';
import Footer from '@/presentation/components/atoms/footer';
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
