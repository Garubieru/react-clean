import { FieldValidation } from '@/presentation/validation/protocols';
import { EmailError } from '@/presentation/validation/errors';

export class EmailValidation implements FieldValidation {
  constructor(readonly name: string) {}
  validate(value: string): Error {
    return new EmailError();
  }
}
