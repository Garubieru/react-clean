import faker from 'faker';
import { AuthenticationParams } from '@/domain/usecases';
import { AccountModel } from '../models';

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccount = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
});
