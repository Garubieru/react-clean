import { Validation, ValidationFieldValues } from '@/presentation/protocols/validation';
import { FieldValidation } from '@/presentation/validation/protocols';

export class ValidationComposite implements Validation {
  private constructor(
    private readonly validations: { [fieldName: string]: FieldValidation[] },
  ) {}

  static build(validations: {
    [fieldName: string]: FieldValidation[];
  }): ValidationComposite {
    return new ValidationComposite(validations);
  }

  validate<T extends ValidationFieldValues>(values: T): T {
    const formValues = Object.entries(values);
    const errors = formValues.reduce((ac, value) => {
      const [fieldKey, fieldValue] = value;
      const error = this.checkFieldError(fieldKey, fieldValue);
      return {
        ...ac,
        [fieldKey]: error,
      };
    }, {});
    return errors as T;
  }

  private checkFieldError(fieldName: string, fieldValue: string): string | null {
    const valueValidations = this.validations[fieldName];
    for (const validation of valueValidations) {
      const validationError = validation.validate(fieldValue);
      if (validationError) return validationError.message;
    }
    return null;
  }
}
