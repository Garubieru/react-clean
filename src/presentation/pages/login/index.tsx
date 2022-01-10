import React, { useEffect, useState } from 'react';
import Styles from './styles.scss';
import { Input, Button, Link, Error, PageWrapper } from '@/presentation/components';
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
            <Link to="/signup" data-testid="signup-link">
              Create account
            </Link>
          </form>
        </FormContext.Provider>
      </div>
    </PageWrapper>
  );
};

export default Login;
