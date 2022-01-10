import React, { useEffect, useState } from 'react';
import Styles from './styles.scss';
import { Input, Button, Link, Error, PageWrapper, Form } from '@/presentation/components';
import { FormContext, FormContextState } from '@/presentation/context/form/form-context';
import { Validation } from '@/presentation/protocols/validation';
import { AuthenticationProtocol, StoreAccessToken } from '@/domain/usecases';
import { useNavigate } from 'react-router-dom';

type LoginProps = {
  validation: Validation;
  authentication: AuthenticationProtocol;
  storeAccessToken: StoreAccessToken;
};

const Login: React.FC<LoginProps> = ({
  validation,
  authentication,
  storeAccessToken,
}) => {
  const navigate = useNavigate();
  const [state, setState] = useState<FormContextState>({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  });

  const hasError = !!state.emailError || !!state.passwordError;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (hasError) return;
    setState((prevState) => ({ ...prevState, isLoading: true }));
    try {
      const { accessToken } = await authentication.auth({
        email: state.email,
        password: state.password,
      });
      await storeAccessToken.store(accessToken);
      navigate('/');
    } catch (e) {
      const errorMsg = e as Error;
      setState((prevState) => ({
        ...prevState,
        mainError: errorMsg.message,
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    const errors = validation.validate({ email: state.email, password: state.password });
    setState((prevState) => ({
      ...prevState,
      emailError: errors.email,
      passwordError: errors.password,
    }));
  }, [state.email, state.password]);

  return (
    <PageWrapper>
      <div className={Styles.loginContainer}>
        <FormContext.Provider value={{ state, setState }}>
          <Form title="Signin" onSubmit={handleSubmit} data-testid="form">
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
            <Link to="/signup" data-testid="signup-link">
              Create account
            </Link>
          </Form>
        </FormContext.Provider>
      </div>
    </PageWrapper>
  );
};

export default Login;
