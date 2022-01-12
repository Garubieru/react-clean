import React, { useEffect, useMemo, useState } from 'react';
import Styles from './styles.scss';
import { Input, Button, Link, Error, PageWrapper, Form } from '@/presentation/components';
import { FormContext } from '@/presentation/context/form/form-context';
import { Validation } from '@/presentation/protocols/validation';
import { RemoteSignupProtocol } from '@/domain/usecases';

type SignupProps = {
  validations?: Validation;
  remoteSignup?: RemoteSignupProtocol;
};

const Signup: React.FC<SignupProps> = ({ validations, remoteSignup }) => {
  const [state, setState] = useState({
    isLoading: false,
    mainError: '',
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    passwordConfirmation: '',
    passwordConfirmationError: '',
  });

  useEffect(() => {
    const { name, email, password, passwordConfirmation } = state;
    const errors = validations.validate({
      name,
      email,
      password,
      passwordConfirmation,
    });

    setState((prevState) => ({
      ...prevState,
      emailError: errors.email,
      nameError: errors.name,
      passwordError: errors.password,
      passwordConfirmationError: errors.passwordConfirmation,
    }));
  }, [state.email, state.name, state.password, state.passwordConfirmation]);

  const hasErrors = useMemo(
    () =>
      !!state.emailError ||
      !!state.nameError ||
      !!state.passwordError ||
      !!state.passwordConfirmationError,
    [
      state.emailError,
      state.nameError,
      state.passwordError,
      state.passwordConfirmationError,
    ],
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (hasErrors || state.isLoading) return;
    setState((prevState) => ({ ...prevState, isLoading: true }));
    const { email, name, password, passwordConfirmation } = state;
    try {
      await remoteSignup.create({ email, name, password, passwordConfirmation });
    } catch (e) {
      const error = e as Error;
      setState((prevState) => ({
        ...prevState,
        mainError: error.message,
        isLoading: false,
      }));
    }
  };

  return (
    <PageWrapper>
      <div className={Styles.signupContainer}>
        <FormContext.Provider value={{ state, setState }}>
          <Form title="Signup" onSubmit={handleSubmit} data-testid="create-form">
            <Input name="name" type="text" placeholder="Name" />
            <Input name="email" type="email" placeholder="Email" />
            <Input name="password" type="password" placeholder="Password" />
            <Input
              name="passwordConfirmation"
              type="password"
              placeholder="Repeat your password"
            />
            <Button
              type="submit"
              data-testid="create-btn"
              disabled={hasErrors}
              isLoading={state.isLoading}
            >
              Create
            </Button>
            <Error />
            <Link to="/login" data-testid="login-link">
              Back to Signin
            </Link>
          </Form>
        </FormContext.Provider>
      </div>
    </PageWrapper>
  );
};

export default Signup;
