import React, { useState } from 'react';
import Styles from './styles.scss';
import { Input, Button, Link, Error, PageWrapper } from '@/presentation/components';
import { FormContext } from '@/presentation/context/form/form-context';

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false,
  });

  const [errorState] = useState({
    email: 'Required field',
    password: 'Required field',
    main: '',
  });

  return (
    <PageWrapper>
      <div className={Styles.mainContainer}>
        <FormContext.Provider value={{ state, errorState }}>
          <form className={Styles.form}>
            <h2>Login</h2>
            <Input name="email" type="email" placeholder="Email" data-testid="email" />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              data-testid="password"
            />
            <Button
              type="button"
              data-testid="login-button"
              isLoading={state.isLoading}
              disabled
            >
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
