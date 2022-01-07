import { InvalidFieldError } from '@/presentation/validation/errors';
import { FieldValidation } from '@/presentation/validation/protocols';

export class FieldValidationSpy implements FieldValidation {
  error: InvalidFieldError | null = null;
  validate(value: string): Error {
    return this.error;
  }
}
