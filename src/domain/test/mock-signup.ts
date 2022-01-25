import faker from 'faker';
import { Signup } from '@/domain/usecases';
import { mockAccount } from '@/domain/test';

export const mockSignupParams = (
  password = faker.internet.password(),
): Signup.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: password,
  passwordConfirmation: password,
});

export const mockSignupModel = (): Signup.Model => mockAccount();
