import { InvalidFieldError } from '@/presentation/validation/errors';
import { FieldValidation } from '@/presentation/validation/protocols';

export class FieldValidationSpy implements FieldValidation {
  error: InvalidFieldError | null = null;
  constructor(readonly name: string) {}
  validate(value: string): Error {
    return this.error;
  }
}
