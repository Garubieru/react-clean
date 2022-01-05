import { Validation } from '../protocols/validation';

export class ValidationSpy implements Validation {
  errorMessage: string;
  fieldValue: string;
  fieldName: string;

  validate(fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    return this.errorMessage;
  }
}
