import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '.';

type SutTypes = {
  sut: RenderResult;
};

const createSut = (): SutTypes => {
  const sut = render(<Login />);
  return { sut };
};

describe('Login Component', () => {
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
});
