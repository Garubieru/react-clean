import { ValidationComposite } from '@/presentation/validation/validators';
import { ValidationBuilder } from '@/presentation/validation/validators/builder/validation-builder';
import { createSignupValidation } from './signup-validation-factory';

describe('SignupValidationFactory', () => {
  it('Should create ValidationComposite with correct validations', () => {
    const sut = createSignupValidation();
    expect(sut).toEqual(
      ValidationComposite.build({
        name: ValidationBuilder.field().required().min(3).build(),
        email: ValidationBuilder.field().required().isEmail().build(),
        password: ValidationBuilder.field().required().min(3).build(),
        passwordConfirmation: ValidationBuilder.field().required().min(3).build(),
      }),
    );
  });
});
