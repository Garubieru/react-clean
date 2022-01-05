import '@testing-library/jest-dom';
import React from 'react';
import faker from 'faker';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import { ValidationStub } from '@/presentation/test';
import Login from '.';

type SutTypes = {
  sut: RenderResult;
  validationStub: ValidationStub;
};

const createSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = faker.random.alpha();
  const sut = render(<Login validation={validationStub} />);
  return { sut, validationStub };
};

describe('Login Component', () => {
  afterEach(() => cleanup());
  it('Should start screen with initial state', () => {
    const { sut, validationStub } = createSut();
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
    const { sut, validationStub } = createSut();
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
    const { sut, validationStub } = createSut();
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
    const { sut, validationStub } = createSut();
    validationStub.errorMessage = null;
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
    const { sut, validationStub } = createSut();
    validationStub.errorMessage = null;
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
});
