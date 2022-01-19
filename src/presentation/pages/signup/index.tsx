import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Link, Error, PageWrapper, Form } from '@/presentation/components';
import { FormContext } from '@/presentation/context/form/form-context';
import { Validation } from '@/presentation/protocols/validation';
import { RemoteSignupProtocol, StoreLoginAccount } from '@/domain/usecases';
import Styles from './styles.scss';

type SignupProps = {
  validations: Validation;
  remoteSignup: RemoteSignupProtocol;
  storeLoginAccount: StoreLoginAccount;
};

const Signup: React.FC<SignupProps> = ({
  validations,
  remoteSignup,
  storeLoginAccount,
}) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
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
      isFormInvalid:
        !!errors.email ||
        !!errors.password ||
        !!errors.password ||
        !!errors.passwordConfirmation,
    }));
  }, [state.email, state.name, state.password, state.passwordConfirmation]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (state.isFormInvalid || state.isLoading) return;
    setState((prevState) => ({ ...prevState, isLoading: true }));
    const { email, name, password, passwordConfirmation } = state;
    try {
      const account = await remoteSignup.create({
        email,
        name,
        password,
        passwordConfirmation,
      });
      await storeLoginAccount.store(account);
      navigate('/');
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
          <Form title="Signup">
            <form
              onSubmit={handleSubmit}
              data-testid="signup-form"
              className={Styles.form}
            >
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
                disabled={state.isFormInvalid}
                isLoading={state.isLoading}
              >
                Create
              </Button>
            </form>
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
