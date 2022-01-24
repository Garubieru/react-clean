import faker from 'faker';
import { Signup } from '@/domain/usecases';
import { mockAccount } from './mock-account';

export const mockSignupParams = (
  password = faker.internet.password(),
): Signup.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: password,
  passwordConfirmation: password,
});

export const mockSignupModel = (): Signup.Model => mockAccount();
