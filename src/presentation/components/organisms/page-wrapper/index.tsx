import React from 'react';
import { LoginHeader, Footer } from '@/presentation/components';
import Styles from './styles.scss';

type PageWrapperProps = {
  header?: JSX.Element;
};

const PageWrapper: React.FC<PageWrapperProps> = ({ header, children }) => {
  return (
    <div className={Styles.pageWrapper}>
      {header || <LoginHeader />}
      <div className={Styles.pageContent}>{children}</div>
      <Footer />
    </div>
  );
};

export default PageWrapper;
