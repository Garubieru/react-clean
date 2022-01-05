import React, { useState } from 'react';
import Styles from './styles.scss';
import { Input, Button, Link, Error, PageWrapper } from '@/presentation/components';
import { FormContext } from '@/presentation/context/form/form-context';

type StateProps = {
  isLoading: boolean;
  errorMsg: string;
};

const Login: React.FC = () => {
  const [state] = useState<StateProps>({ isLoading: false, errorMsg: '' });
  return (
    <PageWrapper>
      <div className={Styles.mainContainer}>
        <FormContext.Provider value={state}>
          <form className={Styles.form}>
            <h2>Login</h2>
            <Input name="email" type="email" placeholder="Email" />
            <Input name="password" type="password" placeholder="Password" />
            <Button type="button" isLoading={state.isLoading}>
              Login
            </Button>
            <Error />
            <Link href="/oi">Create account</Link>
          </form>
        </FormContext.Provider>
      </div>
    </PageWrapper>
  );
};

export default Login;
