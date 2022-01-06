import '@testing-library/jest-dom';
import 'jest-localstorage-mock';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import faker from 'faker';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import { ValidationStub, AuthenticationSpy } from '@/presentation/test';
import { mockAuthentication } from '@/domain/test';
import Login from '.';
import { AuthenticationParams } from '@/domain/usecases';
import { InvalidCredentialError } from '@/domain/errors';

type SutTypes = {
  sut: RenderResult;
  validationStub: ValidationStub;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  authParams?: AuthenticationParams;
  withError?: boolean;
  populateForm?: boolean;
  submitForm?: boolean;
};

type InputName = 'password' | 'email';

const history = createMemoryHistory();
const createSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.withError && faker.random.words();
  const authenticationSpy = new AuthenticationSpy();
  const sut = render(
    <Router location={history.location} navigator={history}>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </Router>,
  );
  if (params?.populateForm) populateForm(sut, params?.submitForm, params?.authParams);
  return { sut, validationStub, authenticationSpy };
};

const populateForm = (
  sut: RenderResult,
  submit = false,
  authParams = mockAuthentication(),
): void => {
  populateField(sut, 'email', authParams.email);
  populateField(sut, 'password', authParams.password);
  if (submit) submitForm(sut);
};

const submitForm = (sut: RenderResult): void => {
  const submitButton = sut.getByTestId('login-button') as HTMLButtonElement;
  fireEvent.click(submitButton);
};

const populateField = (
  sut: RenderResult,
  inputName: 'password' | 'email',
  inputValue?: string,
): void => {
  const input = sut.getByTestId(inputName) as HTMLInputElement;
  fireEvent.input(input, {
    target: { value: inputValue || faker.internet[inputName]() },
  });
};

const simulateFieldStatus = (
  sut: RenderResult,
  inputName: InputName,
  errorMessage?: string,
): void => {
  const status = sut.getByTestId(`${inputName}-status`) as HTMLInputElement;
  expect(status.textContent).toBe(errorMessage || '');
  const icon = errorMessage ? 'icon-warning' : 'icon-success';
  expect(status.firstElementChild).toHaveAttribute(
    'class',
    expect.stringContaining(icon),
  );
};

describe('Login Component', () => {
  afterEach(() => cleanup());
  beforeEach(() => localStorage.clear());
  it('Should start screen with initial state', () => {
    const { sut, validationStub } = createSut({ withError: true });
    const { getByTestId } = sut;
    const error = getByTestId('error-msg');
    expect(error.classList.contains('hidden')).toBeTruthy();

    const button = getByTestId('login-button') as HTMLButtonElement;
    expect(button.disabled).toBeTruthy();

    simulateFieldStatus(sut, 'email', validationStub.errorMessage);
    simulateFieldStatus(sut, 'password', validationStub.errorMessage);
  });

  it('Should throw email error if Validations fail', () => {
    const { sut, validationStub } = createSut({ withError: true });
    populateField(sut, 'email');
    simulateFieldStatus(sut, 'email', validationStub.errorMessage);
  });

  it('Should throw password error if Validations fail', () => {
    const { sut, validationStub } = createSut({ withError: true });
    populateField(sut, 'password');
    simulateFieldStatus(sut, 'password', validationStub.errorMessage);
  });

  it('Should not throw email error if Validations succeeds', () => {
    const { sut } = createSut();
    populateField(sut, 'email');
    simulateFieldStatus(sut, 'email');
  });

  it('Should not throw password error if Validations succeeds', () => {
    const { sut } = createSut();
    populateField(sut, 'password');
    simulateFieldStatus(sut, 'password');
  });

  it('Should not be able to submit if form is invalid', () => {
    const { sut } = createSut({ withError: true, populateForm: true });
    const { getByTestId } = sut;

    const submitButton = getByTestId('login-button') as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();
  });

  it('Should be able to submit if form is valid', () => {
    const { sut } = createSut({ populateForm: true });
    const { getByTestId } = sut;

    const submitButton = getByTestId('login-button') as HTMLButtonElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  it('Should show spinner in button when submit', () => {
    const { sut } = createSut({ populateForm: true, submitForm: true });
    const { getByTestId } = sut;
    const spinner = getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  it('Should call Authentication with correct values', async () => {
    const authParams = mockAuthentication();
    const { authenticationSpy } = createSut({
      populateForm: true,
      submitForm: true,
      authParams: authParams,
    });

    expect(authenticationSpy.params).toEqual(authParams);
  });

  it('Should call Authentication only once while submitting', async () => {
    const authParams = mockAuthentication();
    const { sut, authenticationSpy } = createSut({
      populateForm: true,
      submitForm: true,
      authParams: authParams,
    });
    populateForm(sut, true);

    expect(authenticationSpy.callsCount).toBe(1);
  });

  it('Should not call Authentication if form is invalid', async () => {
    const { sut, authenticationSpy } = createSut({
      withError: true,
      populateForm: true,
    });
    const form = sut.getByTestId('form');
    fireEvent.submit(form);
    expect(authenticationSpy.callsCount).toBe(0);
  });

  it('Should not call Authentication if form is not fullfiled', async () => {
    const { sut, authenticationSpy } = createSut({
      withError: true,
    });
    const form = sut.getByTestId('form');
    fireEvent.submit(form);
    expect(authenticationSpy.callsCount).toBe(0);
  });

  it('Should not call Authentication if form is valid', async () => {
    const { sut, authenticationSpy } = createSut({ populateForm: true });
    const form = sut.getByTestId('form');
    fireEvent.submit(form);
    expect(authenticationSpy.callsCount).toBe(1);
  });

  it('Should render error if Authentication fails', async () => {
    const { sut, authenticationSpy } = createSut({
      populateForm: true,
    });
    const error = new InvalidCredentialError();
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error));
    submitForm(sut);

    const errorMsg = sut.getByTestId('error-msg');
    await waitFor(() => errorMsg);
    expect(errorMsg.textContent).toBe(error.message);
    expect(errorMsg).toHaveClass('visible');
  });

  it('Should store accessToken on localStorage on success', async () => {
    const { sut, authenticationSpy } = createSut({
      populateForm: true,
      submitForm: true,
    });
    await waitFor(() => sut.getByTestId('form'));
    expect(localStorage.setItem).toBeCalledWith(
      'accessToken',
      authenticationSpy.account.accessToken,
    );
  });

  it('Should go to sign up page on click', async () => {
    const { sut } = createSut();
    const link = sut.getByTestId('signup-link');
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/signup');
  });
});
