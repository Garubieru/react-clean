import '@testing-library/jest-dom';
import React from 'react';
import faker from 'faker';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import { ValidationStub, AuthenticationSpy, Helpers } from '@/presentation/test';
import { mockAuthentication } from '@/domain/test';
import { Login } from '@/presentation/pages';
import { AuthenticationParams } from '@/domain/usecases';
import { InvalidCredentialError } from '@/domain/errors';
import { ApiContext } from '@/presentation/context/api/api-context';
import { AccountModel } from '@/domain/models';

type SutTypes = {
  sut: RenderResult;
  validationStub: ValidationStub;
  authenticationSpy: AuthenticationSpy;
  setLoginAccount: jest.Mock<void, [AccountModel]>;
};

type SutParams = {
  authParams?: AuthenticationParams;
  withError?: boolean;
  populateForm?: boolean;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });

const createSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.withError && faker.random.words();
  const authenticationSpy = new AuthenticationSpy();
  const setLoginAccount = jest.fn();
  const sut = render(
    <ApiContext.Provider value={{ setLoginAccount }}>
      <Router location={history.location} navigator={history}>
        <Login validation={validationStub} authentication={authenticationSpy} />
      </Router>
    </ApiContext.Provider>,
  );
  if (params?.populateForm) populateForm(sut, params?.authParams);

  return { sut, validationStub, authenticationSpy, setLoginAccount };
};

const populateForm = (sut: RenderResult, authParams = mockAuthentication()): void => {
  Helpers.populateField(sut, 'email', authParams.email);
  Helpers.populateField(sut, 'password', authParams.password);
};

describe('Login Component', () => {
  afterEach(() => cleanup());
  it('Should start screen with initial state', async () => {
    const { sut, validationStub } = createSut({ withError: true });

    Helpers.testErrorContainer(sut, 'error-msg');

    Helpers.testButtonStatus(sut, 'login-button', 'disabled');

    Helpers.testFieldStatus(sut, 'email', validationStub.errorMessage);
    Helpers.testFieldStatus(sut, 'password', validationStub.errorMessage);
  });

  it('Should throw email error if Validations fail', async () => {
    const { sut, validationStub } = createSut({ withError: true });
    Helpers.populateField(sut, 'email');
    Helpers.testFieldStatus(sut, 'email', validationStub.errorMessage);
  });

  it('Should throw password error if Validations fail', async () => {
    const { sut, validationStub } = createSut({ withError: true });
    Helpers.populateField(sut, 'password');
    Helpers.testFieldStatus(sut, 'password', validationStub.errorMessage);
  });

  it('Should not throw email error if Validations succeeds', async () => {
    const { sut } = createSut();
    Helpers.populateField(sut, 'email');
    Helpers.testFieldStatus(sut, 'email');
  });

  it('Should not throw password error if Validations succeeds', async () => {
    const { sut } = createSut();
    Helpers.populateField(sut, 'password');
    Helpers.testFieldStatus(sut, 'password');
  });

  it('Should not be able to submit if form is invalid', async () => {
    const { sut } = createSut({ withError: true, populateForm: true });
    Helpers.testButtonStatus(sut, 'login-button', 'disabled');
  });

  it('Should be able to submit if form is valid', async () => {
    const { sut } = createSut({ populateForm: true });
    Helpers.testButtonStatus(sut, 'login-button', 'enabled');
  });

  it('Should show spinner in button when submit', async () => {
    const { sut } = createSut({ populateForm: true });
    await Helpers.submitForm(sut, 'login-form');
    Helpers.testElementIsRendered(sut, 'spinner');
  });

  it('Should call Authentication with correct values', async () => {
    const authParams = mockAuthentication();
    const { sut, authenticationSpy } = createSut({
      populateForm: true,
      authParams: authParams,
    });
    await Helpers.submitForm(sut, 'login-form');

    expect(authenticationSpy.params).toEqual(authParams);
  });

  it('Should button be disable while submitting', async () => {
    const { sut } = createSut({
      populateForm: true,
    });
    await Helpers.submitForm(sut, 'login-form');

    Helpers.testButtonStatus(sut, 'login-button', 'disabled');
  });

  it('Should not call Authentication if form is invalid', async () => {
    const { sut, authenticationSpy } = createSut({
      withError: true,
      populateForm: true,
    });
    await Helpers.submitForm(sut, 'login-form');

    expect(authenticationSpy.callsCount).toBe(0);
  });

  it('Should not call Authentication if form is not fullfiled', async () => {
    const { sut, authenticationSpy } = createSut({
      withError: true,
    });
    await Helpers.submitForm(sut, 'login-form');

    expect(authenticationSpy.callsCount).toBe(0);
  });

  it('Should call Authentication only once if submit is loading', async () => {
    const { sut, authenticationSpy } = createSut({ populateForm: true });
    await Helpers.submitForm(sut, 'login-form');
    await Helpers.submitForm(sut, 'login-form');
    expect(authenticationSpy.callsCount).toBe(1);
  });

  it('Should call Authentication if form is valid', async () => {
    const { sut, authenticationSpy } = createSut({
      populateForm: true,
    });
    await Helpers.submitForm(sut, 'login-form');
    expect(authenticationSpy.callsCount).toBe(1);
  });

  it('Should render error if Authentication fails', async () => {
    const { sut, authenticationSpy } = createSut({
      populateForm: true,
    });
    const error = new InvalidCredentialError();
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(new InvalidCredentialError()));

    await Helpers.submitForm(sut, 'login-form');
    Helpers.testErrorContainer(sut, 'error-msg', error.message);
  });

  it('Should call storeLoginAccountMock.store with correct accessToken and redirect to /', async () => {
    const { sut, setLoginAccount, authenticationSpy } = createSut({
      populateForm: true,
    });
    await Helpers.submitForm(sut, 'login-form');
    expect(setLoginAccount).toHaveBeenCalledWith(authenticationSpy.account);
    expect(history.location.pathname).toBe('/');
  });

  it('Should go to sign up page on click', async () => {
    const { sut } = createSut();
    const link = sut.getByTestId('signup-link');
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/signup');
  });

  it('Should render error if storeLoginAccountMock.store fails', async () => {
    const { sut, setLoginAccount } = createSut({
      populateForm: true,
    });
    const error = new Error('error');
    setLoginAccount.mockImplementationOnce(() => {
      throw error;
    });
    await Helpers.submitForm(sut, 'login-form');
    Helpers.testErrorContainer(sut, 'error-msg', error.message);
  });
});
