import { Validation } from '@/presentation/protocols/validation';
import { FieldValidation } from '../../protocols';

export class ValidationComposite implements Validation {
  private constructor(
    private readonly validations: { [fieldName: string]: FieldValidation[] },
  ) {}

  static build(validations: {
    [fieldName: string]: FieldValidation[];
  }): ValidationComposite {
    return new ValidationComposite(validations);
  }

  validate(fieldName: string, fieldValue: string): string | null {
    const fieldValidations = this.validations[fieldName];
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
