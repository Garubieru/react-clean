import React from 'react';
import { Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { createMemoryHistory } from 'history';
import { render, fireEvent, screen } from '@testing-library/react';

import { ValidationStub, AuthenticationSpy, Helpers } from '@/presentation/test';
import { ApiContext } from '@/presentation/context/api/api-context';
import { RequiredFieldError } from '@/validation/errors';

import { mockAuthenticationParams } from '@/domain/test';
import { Authentication, AuthenticationParams } from '@/domain/usecases';
import { InvalidCredentialError } from '@/domain/errors';

import Login from '.';

type SutTypes = {
  validationStub: ValidationStub;
  authenticationSpy: AuthenticationSpy;
  setLoginAccount: jest.Mock<void, [Authentication.Model]>;
};

type SutParams = {
  authParams?: AuthenticationParams;
  withError?: boolean;
  populateForm?: boolean;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });

const createSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.withError && new RequiredFieldError().message;
  const authenticationSpy = new AuthenticationSpy();
  const setLoginAccount = jest.fn();
  render(
    <RecoilRoot>
      <ApiContext.Provider value={{ setLoginAccount }}>
        <Router location={history.location} navigator={history}>
          <Login validation={validationStub} authentication={authenticationSpy} />
        </Router>
      </ApiContext.Provider>
    </RecoilRoot>,
  );
  if (params?.populateForm) populateForm(params?.authParams);

  return { validationStub, authenticationSpy, setLoginAccount };
};

const populateForm = (authParams = mockAuthenticationParams()): void => {
  Helpers.populateField('email', authParams.email);
  Helpers.populateField('password', authParams.password);
};

describe('Login Component', () => {
  it('Should start screen with initial state', async () => {
    const { validationStub } = createSut({ withError: true });

    Helpers.testErrorContainer('error-msg');
    expect(screen.getByTestId('login-button')).toBeDisabled();

    Helpers.testFieldStatus('email', validationStub.errorMessage);
    Helpers.testFieldStatus('password', validationStub.errorMessage);
  });

  it('Should throw email error if Validations fail', async () => {
    const { validationStub } = createSut({ withError: true });
    Helpers.populateField('email');
    Helpers.testFieldStatus('email', validationStub.errorMessage);
  });

  it('Should throw password error if Validations fail', async () => {
    const { validationStub } = createSut({ withError: true });
    Helpers.populateField('password');
    Helpers.testFieldStatus('password', validationStub.errorMessage);
  });

  it('Should not throw email error if Validations succeeds', async () => {
    createSut();
    Helpers.populateField('email');
    Helpers.testFieldStatus('email');
  });

  it('Should not throw password error if Validations succeeds', async () => {
    createSut();
    Helpers.populateField('password');
    Helpers.testFieldStatus('password');
  });

  it('Should not be able to submit if form is invalid', async () => {
    createSut({ withError: true, populateForm: true });
    expect(screen.getByTestId('login-button')).toBeDisabled();
  });

  it('Should be able to submit if form is valid', async () => {
    createSut({ populateForm: true });
    expect(screen.getByTestId('login-button')).toBeEnabled();
  });

  it('Should show spinner in button when submit', async () => {
    createSut({ populateForm: true });
    await Helpers.submitForm('login-form');
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('Should call Authentication with correct values', async () => {
    const authParams = mockAuthenticationParams();
    const { authenticationSpy } = createSut({
      populateForm: true,
      authParams: authParams,
    });
    await Helpers.submitForm('login-form');

    expect(authenticationSpy.params).toEqual(authParams);
  });

  it('Should button be disable while submitting', async () => {
    createSut({
      populateForm: true,
    });
    await Helpers.submitForm('login-form');

    expect(screen.getByTestId('login-button')).toBeDisabled();
  });

  it('Should not call Authentication if form is invalid', async () => {
    const { authenticationSpy } = createSut({
      withError: true,
      populateForm: true,
    });
    await Helpers.submitForm('login-form');

    expect(authenticationSpy.callsCount).toBe(0);
  });

  it('Should not call Authentication if form is not fullfiled', async () => {
    const { authenticationSpy } = createSut({
      withError: true,
    });
    await Helpers.submitForm('login-form');

    expect(authenticationSpy.callsCount).toBe(0);
  });

  it('Should call Authentication only once if submit is loading', async () => {
    const { authenticationSpy } = createSut({ populateForm: true });
    await Helpers.submitForm('login-form');
    await Helpers.submitForm('login-form');
    expect(authenticationSpy.callsCount).toBe(1);
  });

  it('Should call Authentication if form is valid', async () => {
    const { authenticationSpy } = createSut({
      populateForm: true,
    });
    await Helpers.submitForm('login-form');
    expect(authenticationSpy.callsCount).toBe(1);
  });

  it('Should render error if Authentication fails', async () => {
    const { authenticationSpy } = createSut({
      populateForm: true,
    });
    const error = new InvalidCredentialError();
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(new InvalidCredentialError()));

    await Helpers.submitForm('login-form');
    Helpers.testErrorContainer('error-msg', error.message);
  });

  it('Should call storeLoginAccountMock.store with correct accessToken and redirect to /', async () => {
    const { setLoginAccount, authenticationSpy } = createSut({
      populateForm: true,
    });
    await Helpers.submitForm('login-form');
    expect(setLoginAccount).toHaveBeenCalledWith(authenticationSpy.account);
    expect(history.location.pathname).toBe('/');
  });

  it('Should go to sign up page on click', async () => {
    createSut();
    const link = screen.getByTestId('signup-link');
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/signup');
  });

  it('Should render error if storeLoginAccountMock.store fails', async () => {
    const { setLoginAccount } = createSut({
      populateForm: true,
    });
    const error = new Error('error');
    setLoginAccount.mockImplementationOnce(() => {
      throw error;
    });
    await Helpers.submitForm('login-form');
    Helpers.testErrorContainer('error-msg', error.message);
  });
});
