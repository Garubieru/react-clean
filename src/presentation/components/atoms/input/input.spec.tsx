import React from 'react';
import faker from 'faker';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import Input from '.';

const createSut = (inputId: string): RenderResult => {
  return render(<Input name={inputId} state={{}} setState={null} />);
};

describe('InputComponent', () => {
  it('Should be disabled when input has no focus', () => {
    const inputId = faker.datatype.uuid();
    const sut = createSut(inputId);
    const input = sut.getByTestId(inputId) as HTMLInputElement;
    expect(input.readOnly).toBeTruthy();
  });

  it('Should be enabled when input get focused', () => {
    const inputId = faker.datatype.uuid();
    const sut = createSut(inputId);
    const input = sut.getByTestId(inputId) as HTMLInputElement;
    fireEvent.focus(input);
    expect(input.readOnly).toBeFalsy();
  });
});
