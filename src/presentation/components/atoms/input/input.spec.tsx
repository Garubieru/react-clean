import React from 'react';
import faker from 'faker';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import * as FormContext from '@/presentation/context/form/form-context';
import Input from '.';

// jest.mock('@/presentation/context/form/form-context');
// export type UseFormMockType = jest.Mocked<typeof FormContext>;

// const useFormMocked = FormContext as UseFormMockType;
// useFormMocked.useForm.mockReturnValue({ state: {} });

const createSut = (inputId: string): RenderResult => {
  const mockedUseForm = jest.spyOn(FormContext, 'useForm');
  mockedUseForm.mockReturnValue({ state: {} });
  return render(<Input name={inputId} />);
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
