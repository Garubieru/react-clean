import { Validation } from '../protocols/validation';

export class ValidationSpy implements Validation {
  errorMessage: string | null = null;
  fieldValue: string;
  fieldName: string;

  validate(fieldName: string, fieldValue: string): string | null {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    return this.errorMessage;
  }
}
