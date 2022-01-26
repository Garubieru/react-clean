import { FieldValidation } from '@/validation/protocols';
import { InvalidFieldError } from '@/validation/errors';

export class CompareFieldsValidation implements FieldValidation {
  constructor(private readonly fieldToCompare: string) {}

  validate(value: string, values: Record<string, unknown>): InvalidFieldError {
    return value !== values[this.fieldToCompare]
      ? new InvalidFieldError(`Field must be equal to ${this.fieldToCompare}`)
      : null;
  }
}
