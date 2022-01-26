import { EmailValidatorProtocol } from '@/validation/protocols';

export class EmailValidatorSpy implements EmailValidatorProtocol {
  value: string;
  valid = true;
  validate(value: string): boolean {
    this.value = value;
    return this.valid;
  }
}
