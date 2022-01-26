import { Validation } from '@/presentation/protocols/validation';
import { ValidationComposite, ValidationBuilder } from '@/validation/validators';

export const createLoginValidation = (): Validation => {
  return ValidationComposite.build({
    email: ValidationBuilder.field().required().isEmail().build(),
    password: ValidationBuilder.field().required().min(3).build(),
  });
};
