import React from 'react';
import Styles from './styles.scss';
import { Input, Button, Link, Error, PageWrapper } from '@/presentation/components';

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
