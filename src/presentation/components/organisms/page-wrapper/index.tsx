import React from 'react';
import { LoginHeader, Footer } from '@/presentation/components';
import Styles from './styles.scss';

type PageWrapperProps = {
  header?: React.FC;
};

const PageWrapper: React.FC<PageWrapperProps> = ({ header: Header, ...props }) => {
  return (
    <div className={Styles.pageWrapper}>
      {Header ? <Header /> : <LoginHeader />}
      <div className={Styles.pageContent}>{props.children}</div>
      <Footer />
    </div>
  );
};

export default PageWrapper;
