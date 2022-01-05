import { Validation } from '../protocols/validation';

export class ValidationStub implements Validation {
  errorMessage: string | null = null;

  validate(fieldName: string, fieldValue: string): string | null {
    return this.errorMessage;
  }
}
