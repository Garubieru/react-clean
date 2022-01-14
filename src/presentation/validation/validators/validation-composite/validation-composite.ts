import {
  Validation,
  ValidationFields,
  ValidationFieldValues,
} from '@/presentation/protocols/validation';

export class ValidationComposite implements Validation {
  private constructor(private readonly validations: ValidationFields) {}

  static build(validations: ValidationFields): ValidationComposite {
    return new ValidationComposite(validations);
  }

  validate<T extends ValidationFieldValues>(values: T): T {
    const formValues = Object.entries(values);
    const errors = formValues.reduce((ac, value) => {
      const [fieldKey, fieldValue] = value;
      const error = this.checkFieldError(fieldKey, fieldValue, values);
      return {
        ...ac,
        [fieldKey]: error,
      };
    }, {});
    return errors as T;
  }

  private checkFieldError(
    fieldName: string,
    fieldValue: string,
    values: ValidationFieldValues,
  ): string | null {
    const valueValidations = this.validations[fieldName];
    for (const validation of valueValidations) {
      const validationError = validation.validate(fieldValue, values);
      if (validationError) return validationError.message;
    }
    return null;
  }
}
