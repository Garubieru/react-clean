import React from 'react';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '.';
import { Validation } from '@/presentation/protocols/validation';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};
class ValidationSpy implements Validation {
  errorMessage: string;
  inputValue: unknown;
  validate(value: unknown): string {
    this.inputValue = value;
    return this.errorMessage;
  }
}

const createSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = render(<Login validation={validationSpy} />);
  return { sut, validationSpy };
};

describe('Login Component', () => {
  afterEach(() => cleanup());
  it('Should start screen with initial state', () => {
    const { sut } = createSut();
    const { getByTestId } = sut;
    const error = getByTestId('error-msg');
    expect(error.classList.contains('hidden')).toBeTruthy();

    const button = getByTestId('login-button') as HTMLButtonElement;
    expect(button.disabled).toBeTruthy();
    const requiredMessage = 'Required field';

    const emailStatus = getByTestId('email-status') as HTMLInputElement;
    expect(emailStatus.querySelector('div').innerHTML).toBe(requiredMessage);
    expect(emailStatus.firstElementChild).toHaveAttribute(
      'class',
      expect.stringContaining('fa-exclamation-circle'),
    );
    const passwordStatus = getByTestId('password-status') as HTMLInputElement;
    expect(passwordStatus.querySelector('div').innerHTML).toBe(requiredMessage);
    expect(passwordStatus.firstElementChild).toHaveAttribute(
      'class',
      expect.stringContaining('fa-exclamation-circle'),
    );
  });

  it('Should call validation with correct email value', () => {
    const { sut, validationSpy } = createSut();
    const { getByTestId } = sut;
    const emailInput = getByTestId('email') as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: 'any_email' } });
    expect(validationSpy.inputValue).toEqual({ email: 'any_email' });
  });

  it('Should call validation with correct password value', () => {
    const { sut, validationSpy } = createSut();
    const { getByTestId } = sut;
    const passwordInput = getByTestId('password') as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: 'any_password' } });
    expect(validationSpy.inputValue).toEqual({ password: 'any_password' });
  });
});
