import React from 'react';
import { render } from '@testing-library/react';
import Login from '.';

describe('Login Component', () => {
  it('Should start screen with initial state', () => {
    const { getByTestId } = render(<Login />);
    const error = getByTestId('error-msg');
    const button = getByTestId('login-button') as HTMLButtonElement;
    expect(error.classList.contains('hidden')).toBeTruthy();
    expect(button.disabled).toBeTruthy();
  });
});
