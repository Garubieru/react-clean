import { FieldValidation } from '@/validation/protocols';
import { InvalidFieldError } from '@/validation/errors';

export class MinLengthValidation implements FieldValidation {
  constructor(readonly length: number) {}
  validate(value: string): Error {
    return value.length >= this.length
      ? null
      : new InvalidFieldError(`Value must have more than ${this.length} characters`);
  }
}
