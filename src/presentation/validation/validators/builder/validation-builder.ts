import { EmailValidation, MinLengthValidation, RequiredFieldValidation } from '..';
import { FieldValidation } from '@/presentation/validation/protocols';
import { EmailValidator } from '@/infra/validators/email-validator/email-validator';

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[],
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName));
    return this;
  }

  min(length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, length));
    return this;
  }

  isEmail(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName, new EmailValidator()));
    return this;
  }

  build(): FieldValidation[] {
    return this.validations;
  }
}
