import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '.';

describe('Login Component', () => {
  it('Should start screen with initial state', () => {
    const { getByTestId } = render(<Login />);
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
