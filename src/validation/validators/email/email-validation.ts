import { FieldValidation, EmailValidatorProtocol } from '@/validation/protocols';
import { InvalidFieldError } from '@/validation/errors';

export class EmailValidation implements FieldValidation {
  constructor(private readonly emailValidator: EmailValidatorProtocol) {}

  validate(value: string): Error {
    return this.emailValidator.validate(value)
      ? null
      : new InvalidFieldError('Invalid email');
  }
}
