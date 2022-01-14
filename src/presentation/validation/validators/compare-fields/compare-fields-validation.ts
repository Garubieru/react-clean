import { FieldValidation } from '@/presentation/validation/protocols';
import { CompareFieldError } from '@/presentation/validation/errors';

export class CompareFieldsValidation implements FieldValidation {
  constructor(private readonly fieldToCompare: string) {}

  validate(value: string, values: Record<string, unknown>): CompareFieldError {
    return value !== values[this.fieldToCompare] ? new CompareFieldError() : null;
  }
}
