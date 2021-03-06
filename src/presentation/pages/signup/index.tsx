import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { Signup as SignupProtocol } from '@/domain/usecases';
import { Button, Link, PageWrapper, Form } from '@/presentation/components';
import { Validation } from '@/presentation/protocols/validation';
import { loginApiState } from '@/presentation/context/api/api-state';
import { signupState, Input, Error } from './components';
import Styles from './styles.scss';

type SignupProps = {
  validations: Validation;
  remoteSignup: SignupProtocol;
};

const Signup: React.FC<SignupProps> = ({ validations, remoteSignup }) => {
  const navigate = useNavigate();
  const { setLoginAccount } = useRecoilValue(loginApiState);
  const [state, setState] = useRecoilState(signupState);
  const resetState = useResetRecoilState(signupState);

  useEffect(() => resetState(), []);

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
      setLoginAccount(account);
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
        <Form title="Signup">
          <form onSubmit={handleSubmit} data-testid="signup-form" className={Styles.form}>
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
      </div>
    </PageWrapper>
  );
};

export default Signup;
