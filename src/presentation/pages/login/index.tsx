import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Link, Error, PageWrapper, Form } from '@/presentation/components';
import { FormContext } from '@/presentation/context/form/form-context';
import { Validation } from '@/presentation/protocols/validation';
import Styles from './styles.scss';
import { useApi } from '@/presentation/context/api/api-context';
import { Authentication } from '@/domain/usecases';

type LoginProps = {
  validation: Validation;
  authentication: Authentication;
};

const Login: React.FC<LoginProps> = ({ validation, authentication }) => {
  const { setLoginAccount } = useApi();
  const navigate = useNavigate();
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  });

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
        <FormContext.Provider value={{ state, setState }}>
          <Form title="Signin">
            <form
              onSubmit={handleSubmit}
              className={Styles.form}
              data-testid="login-form"
            >
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
        </FormContext.Provider>
      </div>
    </PageWrapper>
  );
};

export default Login;
