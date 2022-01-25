import { EmailValidator } from '@/infra/validators/email-validator/email-validator';
import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  ValidationComposite,
  CompareFieldsValidation,
} from '@/presentation/validation/validators';
import { createSignupValidation } from './signup-validation-factory';

describe('SignupValidationFactory', () => {
  it('Should create ValidationComposite with correct validations', () => {
    const sut = createSignupValidation();
    expect(sut).toEqual(
      ValidationComposite.build({
        name: [new RequiredFieldValidation(), new MinLengthValidation(3)],
        email: [new RequiredFieldValidation(), new EmailValidation(new EmailValidator())],
        password: [new RequiredFieldValidation(), new MinLengthValidation(3)],
        passwordConfirmation: [
          new RequiredFieldValidation(),
          new MinLengthValidation(3),
          new CompareFieldsValidation('password'),
        ],
      }),
    );
  });
});
