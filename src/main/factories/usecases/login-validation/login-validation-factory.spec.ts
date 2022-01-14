import { ValidationComposite } from '@/presentation/validation/validators';
import { ValidationBuilder } from '@/presentation/validation/validators/builder/validation-builder';
import { createLoginValidation } from './login-validation-factory';

describe('LoginValidationFactory', () => {
  it('Shoud create ValidationComposite with correct validations', () => {
    const sut = createLoginValidation();

    expect(sut).toEqual(
      ValidationComposite.build({
        email: ValidationBuilder.field().required().isEmail().build(),
        password: ValidationBuilder.field().required().min(3).build(),
      }),
    );
  });
});
