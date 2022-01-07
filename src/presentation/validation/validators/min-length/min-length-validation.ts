import { FieldValidation } from '@/presentation/validation/protocols';
import { InvalidFieldError } from '@/presentation/validation/errors';

export class MinLengthValidation implements FieldValidation {
  constructor(readonly name: string, readonly length: number) {}
  validate(value: string): Error {
    return value.length >= this.length
      ? null
      : new InvalidFieldError(`Value must have more than ${this.length} characters`);
  }
}
