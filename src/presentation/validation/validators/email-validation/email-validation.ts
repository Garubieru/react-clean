import {
  FieldValidation,
  EmailValidatorProtocol,
} from '@/presentation/validation/protocols';
import { EmailError } from '@/presentation/validation/errors';

export class EmailValidation implements FieldValidation {
  constructor(
    readonly name: string,
    private readonly emailValidator: EmailValidatorProtocol,
  ) {}

  validate(value: string): Error {
    return this.emailValidator.validate(value) ? null : new EmailError();
  }
}
