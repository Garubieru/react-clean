import faker from 'faker';
import { Authentication } from '@/domain/usecases';
import { mockAccount } from '@/domain/test';

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAuthenticationModel = (): Authentication.Model => mockAccount();
