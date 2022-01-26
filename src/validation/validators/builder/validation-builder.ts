import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  CompareFieldsValidation,
} from '@/validation/validators';
import { FieldValidation } from '@/validation/protocols';
import { EmailValidator } from '@/infra/validators/email-validator/email-validator';

export class ValidationBuilder {
  private constructor(private readonly validations: FieldValidation[]) {}

  static field(): ValidationBuilder {
    return new ValidationBuilder([]);
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation());
    return this;
  }

  min(length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(length));
    return this;
  }

  isEmail(): ValidationBuilder {
    this.validations.push(new EmailValidation(new EmailValidator()));
    return this;
  }

  isEqual(fieldToCompare: string): ValidationBuilder {
    this.validations.push(new CompareFieldsValidation(fieldToCompare));
    return this;
  }

  build(): FieldValidation[] {
    return this.validations;
  }
}
