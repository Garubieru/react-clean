import React from 'react';
import Styles from './styles.scss';

import LoginHeader from '@/presentation/components/molecules/login-header';
import Input from '@/presentation/components/atoms/input';
import Button from '@/presentation/components/atoms/button';
import Footer from '@/presentation/components/atoms/footer';
import Link from '@/presentation/components/atoms/link';

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <div className={Styles.pageContent}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input name="email" type="email" placeholder="Email" />
          <Input name="password" type="password" placeholder="Password" />
          <Button>Login</Button>
          <span className={Styles.errorWrapper}>An error ocurred</span>
          <Link href="/oi">Create account</Link>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
