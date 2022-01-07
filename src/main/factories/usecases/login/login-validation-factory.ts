import { Validation } from '@/presentation/protocols/validation';
import { ValidationComposite } from '@/presentation/validation/validators';
import { ValidationBuilder } from '@/presentation/validation/validators/builder/validation-builder';

export const createLoginValidation = (): Validation => {
  return ValidationComposite.build({
    email: ValidationBuilder.field().required().isEmail().build(),
    password: ValidationBuilder.field().required().min(3).build(),
  });
};
