import faker from 'faker';
import { fireEvent, waitFor, screen } from '@testing-library/react';

export const testFieldStatus = (fieldName: string, error?: string): void => {
  const inputWrap = screen.getByTestId(`${fieldName}-input-wrap`);
  expect(inputWrap).toHaveAttribute('data-status', error ? 'warning' : 'success');
  expect(inputWrap.querySelector('.inputErrorMsg')).toHaveTextContent(error || '');
};

export const submitForm = async (formId: string): Promise<HTMLFormElement> => {
  const form = screen.getByTestId<HTMLFormElement>(formId);
  fireEvent.submit(form);
  await waitFor(() => form);
  return form;
};

export const populateField = (
  fieldName: string,
  value: string = faker.random.words(),
): void => {
  const input = screen.getByTestId(fieldName);
  fireEvent.input(input, { target: { value } });
};

export const testErrorContainer = (name: string, error?: string): void => {
  const errorContainer = screen.getByTestId(name);
  expect(errorContainer).toHaveClass(error ? 'visible' : 'hidden');
  expect(errorContainer).toHaveTextContent(error || '');
};
