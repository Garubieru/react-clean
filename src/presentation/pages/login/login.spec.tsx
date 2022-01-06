import '@testing-library/jest-dom';
import React from 'react';
import faker from 'faker';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import { ValidationStub } from '@/presentation/test';
import Login from '.';
import { AuthenticationParams, AuthenticationProtocol } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';
import { mockAccount, mockAuthentication } from '@/domain/test';

type SutTypes = {
  sut: RenderResult;
  validationStub: ValidationStub;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  withError: boolean;
};

class AuthenticationSpy implements AuthenticationProtocol {
  params: AuthenticationParams;
  account = mockAccount();
  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    return await Promise.resolve(this.account);
  }
}

const createSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.withError && faker.random.words();
  const authenticationSpy = new AuthenticationSpy();
  const sut = render(
    <Login validation={validationStub} authentication={authenticationSpy} />,
  );
  return { sut, validationStub, authenticationSpy };
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

    const emailStatus = getByTestId('email-status') as HTMLInputElement;
    expect(emailStatus.textContent).toBe(validationStub.errorMessage);
    expect(emailStatus.firstElementChild).toHaveAttribute(
      'class',
      expect.stringContaining('fa-exclamation-circle'),
    );
    const passwordStatus = getByTestId('password-status') as HTMLInputElement;
    expect(passwordStatus.textContent).toBe(validationStub.errorMessage);
    expect(passwordStatus.firstElementChild).toHaveAttribute(
      'class',
      expect.stringContaining('fa-exclamation-circle'),
    );
  });

  it('Should throw email error if Validations fail', () => {
    const { sut, validationStub } = createSut({ withError: true });
    const { getByTestId } = sut;
    const emailInput = getByTestId('email') as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = getByTestId('email-status');
    expect(emailStatus.textContent).toBe(validationStub.errorMessage);
    expect(emailStatus.firstElementChild).toHaveAttribute(
      'class',
      expect.stringContaining('icon-warning'),
    );
  });

  it('Should throw password error if Validations fail', () => {
    const { sut, validationStub } = createSut({ withError: true });
    const { getByTestId } = sut;
    const passwordInput = getByTestId('password') as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
    const passwordStatus = getByTestId('password-status');
    expect(passwordStatus.textContent).toBe(validationStub.errorMessage);
    expect(passwordStatus.firstElementChild).toHaveAttribute(
      'class',
      expect.stringContaining('icon-warning'),
    );
  });

  it('Should not throw email error if Validations succeeds', () => {
    const { sut } = createSut();
    const { getByTestId } = sut;
    const emailInput = getByTestId('email') as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = getByTestId('email-status');
    expect(emailStatus.textContent).toBe('');
    expect(emailStatus.firstElementChild).toHaveAttribute(
      'class',
      expect.stringContaining('icon-success'),
    );
  });

  it('Should not throw password error if Validations succeeds', () => {
    const { sut } = createSut();
    const { getByTestId } = sut;
    const passwordInput = getByTestId('password') as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
    const passwordStatus = getByTestId('password-status');
    expect(passwordStatus.textContent).toBe('');
    expect(passwordStatus.firstElementChild).toHaveAttribute(
      'class',
      expect.stringContaining('icon-success'),
    );
  });

  it('Should not be able to submit if form is invalid', () => {
    const { sut } = createSut({ withError: true });
    const { getByTestId } = sut;

    const emailInput = getByTestId('email') as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const passwordInput = getByTestId('password') as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const submitButton = getByTestId('login-button') as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();
  });

  it('Should be able to submit if form is valid', () => {
    const { sut } = createSut();
    const { getByTestId } = sut;

    const emailInput = getByTestId('email') as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const passwordInput = getByTestId('password') as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const submitButton = getByTestId('login-button') as HTMLButtonElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  it('Should show spinner in button when submit', () => {
    const { sut } = createSut();
    const { getByTestId } = sut;

    const emailInput = getByTestId('email') as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const passwordInput = getByTestId('password') as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const submitButton = getByTestId('login-button') as HTMLButtonElement;
    fireEvent.click(submitButton);
    const spinner = getByTestId('spinner');
    expect(submitButton).toContainElement(spinner);
  });

  it('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = createSut();
    const { getByTestId } = sut;

    const authParams = mockAuthentication();
    const emailInput = getByTestId('email') as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: authParams.email } });

    const passwordInput = getByTestId('password') as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: authParams.password } });

    const submitButton = getByTestId('login-button') as HTMLButtonElement;
    fireEvent.click(submitButton);
    await authenticationSpy.auth(authParams);
    expect(authenticationSpy.params).toEqual(authParams);
  });
});
