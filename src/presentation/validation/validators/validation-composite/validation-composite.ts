import { Validation } from '@/presentation/protocols/validation';
import { FieldValidation } from '../../protocols';

export class ValidationComposite implements Validation {
  constructor(private readonly validations: FieldValidation[]) {}
  validate(fieldName: string, fieldValue: string): string | null {
    const fieldValidations = this.validations.filter(
      (validation) => validation.name === fieldName,
    );
    const errorResult = { message: null };
    fieldValidations.some((validation) => {
      const error = validation.validate(fieldValue);
      if (error) {
        errorResult.message = error.message;
        return true;
      }
      return false;
    });
    return errorResult.message;
  }
}
