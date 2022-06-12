import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Authentication } from '@/domain/usecases';
import { Button, Link, PageWrapper, Form } from '@/presentation/components';
import { Validation } from '@/presentation/protocols/validation';
import { loginApiState } from '@/presentation/context/api/api-state';
import { loginState, Input, Error } from './components';
import Styles from './styles.scss';

type LoginProps = {
  validation: Validation;
  authentication: Authentication;
};

const Login: React.FC<LoginProps> = ({ validation, authentication }) => {
  const { setLoginAccount } = useRecoilValue(loginApiState);
  const navigate = useNavigate();
  const [state, setState] = useRecoilState(loginState);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (state.isFormInvalid || state.isLoading) return;
    setState((prevState) => ({ ...prevState, isLoading: true }));
    try {
      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      });
      setLoginAccount(account);
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
    const { email, password } = validation.validate({
      email: state.email,
      password: state.password,
    });
    setState((prevState) => ({
      ...prevState,
      emailError: email,
      passwordError: password,
      isFormInvalid: !!email || !!password,
    }));
  }, [state.email, state.password]);

  return (
    <PageWrapper>
      <div className={Styles.loginContainer}>
        <Form title="Signin">
          <form onSubmit={handleSubmit} className={Styles.form} data-testid="login-form">
            <Input name="email" type="email" placeholder="Email" />
            <Input name="password" type="password" placeholder="Password" />
            <Button
              type="submit"
              data-testid="login-button"
              isLoading={state.isLoading}
              disabled={state.isFormInvalid}
            >
              Login
            </Button>
          </form>
          <Error />
          <Link to="/signup" data-testid="signup-link">
            Create account
          </Link>
        </Form>
      </div>
    </PageWrapper>
  );
};

export default Login;
