import {
  FieldValidation,
  EmailValidatorProtocol,
} from '@/presentation/validation/protocols';
import { InvalidFieldError } from '@/presentation/validation/errors';

export class EmailValidation implements FieldValidation {
  constructor(private readonly emailValidator: EmailValidatorProtocol) {}

  validate(value: string): Error {
    return this.emailValidator.validate(value)
      ? null
      : new InvalidFieldError('Invalid email');
  }
}
