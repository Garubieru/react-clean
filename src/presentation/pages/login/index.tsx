import React, { useEffect, useState } from 'react';
import Styles from './styles.scss';
import { Input, Button, Link, Error, PageWrapper } from '@/presentation/components';
import { FormContext, FormContextState } from '@/presentation/context/form/form-context';
import { Validation } from '@/presentation/protocols/validation';
import { AuthenticationProtocol } from '@/domain/usecases';

type LoginProps = {
  validation?: Validation;
  authentication?: AuthenticationProtocol;
};

const Login: React.FC<LoginProps> = ({ validation, authentication }) => {
  const [state, setState] = useState<FormContextState>({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (state.emailError || state.passwordError) return;
    setState((prevState) => ({ ...prevState, isLoading: true }));
    await authentication.auth({ email: state.email, password: state.password });
  };

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
    }));
  }, [state.email, state.password]);

  const hasError = !!state.emailError || !!state.passwordError;

  return (
    <PageWrapper>
      <div className={Styles.mainContainer}>
        <FormContext.Provider value={{ state, setState }}>
          <form className={Styles.form} onSubmit={handleSubmit} data-testid="form">
            <h2>Login</h2>
            <Input name="email" type="email" placeholder="Email" />
            <Input name="password" type="password" placeholder="Password" />
            <Button
              type="submit"
              data-testid="login-button"
              isLoading={state.isLoading}
              disabled={hasError}
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
