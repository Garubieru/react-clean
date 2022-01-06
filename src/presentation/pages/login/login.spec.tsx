import '@testing-library/jest-dom';
import React from 'react';
import faker from 'faker';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import { ValidationStub, AuthenticationSpy } from '@/presentation/test';
import { mockAuthentication } from '@/domain/test';
import Login from '.';
import { AuthenticationParams } from '@/domain/usecases';

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

const createSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.withError && faker.random.words();
  const authenticationSpy = new AuthenticationSpy();
  const sut = render(
    <Login validation={validationStub} authentication={authenticationSpy} />,
  );
  if (params?.populateForm) populateForm(sut, params?.submitForm, params?.authParams);
  return { sut, validationStub, authenticationSpy };
};

const populateForm = (
  sut: RenderResult,
  submit = false,
  authParams = mockAuthentication(),
): void => {
  const { getByTestId } = sut;
  populateField(sut, 'email', authParams.email);
  populateField(sut, 'password', authParams.password);

  if (submit) {
    const submitButton = getByTestId('login-button') as HTMLButtonElement;
    fireEvent.click(submitButton);
  }
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
});
