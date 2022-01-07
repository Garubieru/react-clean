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
import { Login } from '@/presentation/pages';
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
  throwHttpError?: boolean;
};

type InputName = 'password' | 'email';

const history = createMemoryHistory({ initialEntries: ['/login'] });

const createSut = async (params?: SutParams): Promise<SutTypes> => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.withError && faker.random.words();
  const authenticationSpy = new AuthenticationSpy();
  const sut = render(
    <Router location={history.location} navigator={history}>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </Router>,
  );
  if (params?.populateForm) {
    await populateForm(
      sut,
      authenticationSpy,
      params?.submitForm,
      params?.authParams,
      params?.throwHttpError,
    );
  }

  return { sut, validationStub, authenticationSpy };
};

const populateForm = async (
  sut: RenderResult,
  authSpy: AuthenticationSpy,
  submit = false,
  authParams = mockAuthentication(),
  httpError = false,
): Promise<void> => {
  if (httpError) {
    const error = new InvalidCredentialError();
    jest.spyOn(authSpy, 'auth').mockReturnValueOnce(Promise.reject(error));
  }
  populateField(sut, 'email', authParams.email);
  populateField(sut, 'password', authParams.password);

  if (submit) {
    const form = submitForm(sut);
    await waitFor(() => form);
  }
};

const submitForm = (sut: RenderResult): HTMLFormElement => {
  const form = sut.getByTestId('form') as HTMLFormElement;
  fireEvent.submit(form);
  return form;
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

const testFieldStatus = (
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

const testButtonStatus = (
  sut: RenderResult,
  fieldName: string,
  status: 'disabled' | 'enabled',
): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(button.disabled).toBe(status === 'disabled');
};

const testElementIsRendered = (sut: RenderResult, elName: string): void => {
  const el = sut.getByTestId(elName);
  expect(el).toBeTruthy();
};

const testErrorElement = (
  sut: RenderResult,
  errorId: string,
  errorMsg?: string,
): void => {
  const error = sut.getByTestId(errorId);
  expect(error.textContent).toBe(errorMsg || '');
  expect(error.classList.contains(errorMsg ? 'visible' : 'hidden')).toBeTruthy();
};

describe('Login Component', () => {
  afterEach(() => cleanup());
  beforeEach(() => localStorage.clear());
  it('Should start screen with initial state', async () => {
    const { sut, validationStub } = await createSut({ withError: true });

    testErrorElement(sut, 'error-msg');

    testButtonStatus(sut, 'login-button', 'disabled');

    testFieldStatus(sut, 'email', validationStub.errorMessage);
    testFieldStatus(sut, 'password', validationStub.errorMessage);
  });

  it('Should throw email error if Validations fail', async () => {
    const { sut, validationStub } = await createSut({ withError: true });
    populateField(sut, 'email');
    testFieldStatus(sut, 'email', validationStub.errorMessage);
  });

  it('Should throw password error if Validations fail', async () => {
    const { sut, validationStub } = await createSut({ withError: true });
    populateField(sut, 'password');
    testFieldStatus(sut, 'password', validationStub.errorMessage);
  });

  it('Should not throw email error if Validations succeeds', async () => {
    const { sut } = await createSut();
    populateField(sut, 'email');
    testFieldStatus(sut, 'email');
  });

  it('Should not throw password error if Validations succeeds', async () => {
    const { sut } = await createSut();
    populateField(sut, 'password');
    testFieldStatus(sut, 'password');
  });

  it('Should not be able to submit if form is invalid', async () => {
    const { sut } = await createSut({ withError: true, populateForm: true });
    testButtonStatus(sut, 'login-button', 'disabled');
  });

  it('Should be able to submit if form is valid', async () => {
    const { sut } = await createSut({ populateForm: true });
    testButtonStatus(sut, 'login-button', 'enabled');
  });

  it('Should show spinner in button when submit', async () => {
    const { sut } = await createSut({ populateForm: true, submitForm: true });
    testElementIsRendered(sut, 'spinner');
  });

  it('Should call Authentication with correct values', async () => {
    const authParams = mockAuthentication();
    const { authenticationSpy } = await createSut({
      populateForm: true,
      submitForm: true,
      authParams: authParams,
    });

    expect(authenticationSpy.params).toEqual(authParams);
  });

  it('Should button be disable while submitting', async () => {
    const authParams = mockAuthentication();
    const { sut } = await createSut({
      populateForm: true,
      submitForm: true,
      authParams: authParams,
    });

    testButtonStatus(sut, 'login-button', 'disabled');
  });

  it('Should not call Authentication if form is invalid', async () => {
    const { sut, authenticationSpy } = await createSut({
      withError: true,
      populateForm: true,
    });
    submitForm(sut);
    expect(authenticationSpy.callsCount).toBe(0);
  });

  it('Should not call Authentication if form is not fullfiled', async () => {
    const { sut, authenticationSpy } = await createSut({
      withError: true,
    });
    submitForm(sut);
    expect(authenticationSpy.callsCount).toBe(0);
  });

  it('Should not call Authentication if form is valid', async () => {
    const { sut, authenticationSpy } = await createSut({ populateForm: true });
    submitForm(sut);
    expect(authenticationSpy.callsCount).toBe(1);
  });

  it('Should render error if Authentication fails', async () => {
    const { sut } = await createSut({
      populateForm: true,
      submitForm: true,
      throwHttpError: true,
    });

    testErrorElement(sut, 'error-msg', 'Invalid credentials');
  });

  it('Should store accessToken on localStorage on success', async () => {
    const { authenticationSpy } = await createSut({
      populateForm: true,
      submitForm: true,
    });
    expect(localStorage.setItem).toBeCalledWith(
      'accessToken',
      authenticationSpy.account.accessToken,
    );
    expect(history.location.pathname).toBe('/');
  });

  it('Should go to sign up page on click', async () => {
    const { sut } = await createSut();
    const link = sut.getByTestId('signup-link');
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/signup');
  });
});
