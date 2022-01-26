import { RequiredFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols';

export class RequiredFieldValidation implements FieldValidation {
  validate(value: string): Error {
    return value ? null : new RequiredFieldError();
  }
}
