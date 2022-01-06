import { EmailValidatorProtocol } from '@/presentation/validation/protocols';
import isEmail from 'email-validator';

export class EmailValidator implements EmailValidatorProtocol {
  validate(value: string): boolean {
    return isEmail.validate(value);
  }
}
