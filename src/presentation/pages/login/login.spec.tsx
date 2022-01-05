import '@testing-library/jest-dom';
import React from 'react';
import faker from 'faker';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import { ValidationSpy } from '@/presentation/test';
import Login from '.';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

const createSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = faker.random.alpha();
  const sut = render(<Login validation={validationSpy} />);
  return { sut, validationSpy };
};

describe('Login Component', () => {
  afterEach(() => cleanup());
  it('Should start screen with initial state', () => {
    const { sut, validationSpy } = createSut();
    const { getByTestId } = sut;
    const error = getByTestId('error-msg');
    expect(error.classList.contains('hidden')).toBeTruthy();

    const button = getByTestId('login-button') as HTMLButtonElement;
    expect(button.disabled).toBeTruthy();

    const emailStatus = getByTestId('email-status') as HTMLInputElement;
    expect(emailStatus.querySelector('div').innerHTML).toBe(validationSpy.errorMessage);
    expect(emailStatus.firstElementChild).toHaveAttribute(
      'class',
      expect.stringContaining('fa-exclamation-circle'),
    );
    const passwordStatus = getByTestId('password-status') as HTMLInputElement;
    expect(passwordStatus.querySelector('div').innerHTML).toBe(
      validationSpy.errorMessage,
    );
    expect(passwordStatus.firstElementChild).toHaveAttribute(
      'class',
      expect.stringContaining('fa-exclamation-circle'),
    );
  });

  it('Should call validation with correct email value', () => {
    const { sut, validationSpy } = createSut();
    const { getByTestId } = sut;
    const emailInput = getByTestId('email') as HTMLInputElement;
    const email = faker.internet.email();
    fireEvent.input(emailInput, { target: { value: email } });
    expect(validationSpy.fieldName).toBe('email');
    expect(validationSpy.fieldValue).toBe(email);
  });

  it('Should call validation with correct password value', () => {
    const { sut, validationSpy } = createSut();
    const { getByTestId } = sut;
    const passwordInput = getByTestId('password') as HTMLInputElement;
    const password = faker.internet.password();
    fireEvent.input(passwordInput, { target: { value: password } });
    expect(validationSpy.fieldName).toBe('password');
    expect(validationSpy.fieldValue).toBe(password);
  });

  it('Should throw email error if Validations fail', () => {
    const { sut, validationSpy } = createSut();
    const { getByTestId } = sut;
    const emailInput = getByTestId('email') as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = getByTestId('email-status');
    expect(emailStatus.textContent).toBe(validationSpy.errorMessage);
    expect(emailStatus.firstElementChild).toHaveAttribute(
      'class',
      expect.stringContaining('fa-exclamation-circle'),
    );
  });

  it('Should throw password error if Validations fail', () => {
    const { sut, validationSpy } = createSut();
    const { getByTestId } = sut;
    const passwordInput = getByTestId('password') as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
    const passwordStatus = getByTestId('password-status');
    expect(passwordStatus.textContent).toBe(validationSpy.errorMessage);
    expect(passwordStatus.firstElementChild).toHaveAttribute(
      'class',
      expect.stringContaining('fa-exclamation-circle'),
    );
  });
});
