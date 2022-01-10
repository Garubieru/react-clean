import { FieldValidation } from '@/presentation/validation/protocols';
import { InvalidFieldError } from '@/presentation/validation/errors';

export class CompareFieldsValidation implements FieldValidation {
  constructor(private readonly valueToCompare: string) {}
  validate(value: string): InvalidFieldError {
    return value !== this.valueToCompare ? new InvalidFieldError('Invalid field') : null;
  }
}
