import { Validation } from '@/presentation/protocols/validation';
import { ValidationComposite } from '@/presentation/validation/validators';
import { ValidationBuilder } from '@/presentation/validation/validators/builder/validation-builder';

export const createSignupValidation = (): Validation => {
  return ValidationComposite.build({
    name: ValidationBuilder.field().required().min(3).build(),
    email: ValidationBuilder.field().required().isEmail().build(),
    password: ValidationBuilder.field().required().min(3).build(),
    passwordConfirmation: ValidationBuilder.field().required().min(3).build(),
  });
};
