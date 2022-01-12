import { fireEvent, RenderResult, waitFor } from '@testing-library/react';
import faker from 'faker';

export const testFieldStatus = (
  sut: RenderResult,
  fieldName: string,
  error?: string,
): void => {
  const inputStatus = sut.getByTestId(`${fieldName}-status`);
  expect(inputStatus.firstChild).toHaveClass(`icon-${error ? 'warning' : 'success'}`);
  expect(inputStatus.textContent).toBe(error || '');
};

export const testButtonStatus = (
  sut: RenderResult,
  fieldName: string,
  status: 'disabled' | 'enabled',
): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(button.disabled).toBe(status === 'disabled');
};

export const submitForm = async (
  sut: RenderResult,
  formId: string,
): Promise<HTMLFormElement> => {
  const form = sut.getByTestId(formId) as HTMLFormElement;
  fireEvent.submit(form);
  await waitFor(() => form);
  return form;
};

export const populateField = (
  sut: RenderResult,
  fieldName: string,
  value: string = faker.random.words(),
): void => {
  const input = sut.getByTestId(fieldName);
  fireEvent.input(input, { target: { value } });
};

export const testErrorContainer = (
  sut: RenderResult,
  name: string,
  error?: string,
): void => {
  const errorContainer = sut.getByTestId(name);
  expect(errorContainer).toHaveClass(error ? 'visible' : 'hidden');
  expect(errorContainer.textContent).toBe(error || '');
};

export const testElementIsRendered = (sut: RenderResult, elName: string): void => {
  const el = sut.getByTestId(elName);
  expect(el).toBeTruthy();
};