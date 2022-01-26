import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols';

export class FieldValidationSpy implements FieldValidation {
  error: InvalidFieldError | null = null;
  validate(value: string): Error {
    return this.error;
  }
}
