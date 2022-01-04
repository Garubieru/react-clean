import React from 'react';
import Styles from './styles.scss';
import Input from '@/presentation/components/atoms/input';
import Button from '@/presentation/components/atoms/button';
import Link from '@/presentation/components/atoms/link';
import Error from '@/presentation/components/atoms/error';
import PageWrapper from '@/presentation/components/organisms/page-wrapper';

const Login: React.FC = () => {
  return (
    <PageWrapper>
      <div className={Styles.mainContainer}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input name="email" type="email" placeholder="Email" />
          <Input name="password" type="password" placeholder="Password" />
          <Button>Login</Button>
          <Error message="An error ocurred" />
          <Link href="/oi">Create account</Link>
        </form>
      </div>
    </PageWrapper>
  );
};

export default Login;
