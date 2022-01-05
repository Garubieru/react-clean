import React, { useEffect, useState } from 'react';
import Styles from './styles.scss';
import { Input, Button, Link, Error, PageWrapper } from '@/presentation/components';
import { FormContext, FormContextState } from '@/presentation/context/form/form-context';
import { Validation } from '@/presentation/protocols/validation';

type LoginProps = {
  validation?: Validation;
};

const Login: React.FC<LoginProps> = ({ validation }) => {
  const [state, setState] = useState<FormContextState>({
    isLoading: false,
    email: '',
    password: '',
    emailError: 'Required field',
    passwordError: 'Required field',
    mainError: '',
  });

  useEffect(() => {
    validation.validate({ email: state.email });
  }, [state.email]);

  useEffect(() => {
    validation.validate({ password: state.password });
  }, [state.password]);

  return (
    <PageWrapper>
      <div className={Styles.mainContainer}>
        <FormContext.Provider value={{ state, setState }}>
          <form className={Styles.form}>
            <h2>Login</h2>
            <Input name="email" type="email" placeholder="Email" />
            <Input name="password" type="password" placeholder="Password" />
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
