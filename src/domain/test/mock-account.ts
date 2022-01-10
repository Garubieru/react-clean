import faker from 'faker';
import { AuthenticationParams, AccountParams } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccount = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
});

export const mockAccountCreation = (
  password = faker.internet.password(),
): AccountParams => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: password,
  passwordConfirmation: password,
});
