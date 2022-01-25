import { EmailValidator } from '@/infra/validators/email-validator/email-validator';
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
  ValidationComposite,
} from '@/presentation/validation/validators';
import { createLoginValidation } from './login-validation-factory';

describe('LoginValidationFactory', () => {
  it('Shoud create ValidationComposite with correct validations', () => {
    const sut = createLoginValidation();

    expect(sut).toEqual(
      ValidationComposite.build({
        email: [new RequiredFieldValidation(), new EmailValidation(new EmailValidator())],
        password: [new RequiredFieldValidation(), new MinLengthValidation(3)],
      }),
    );
  });
});
