import React from 'react';
import { render } from '@testing-library/react';
import Login from '.';

describe('Login', () => {
  it('Should error warning not be visible', () => {
    const { getByTestId } = render(<Login />);
    const error = getByTestId('error-msg');
    expect(error.classList.contains('hidden')).toBeTruthy();
  });
});
