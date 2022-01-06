import faker from 'faker';
import { EmailError } from '@/presentation/validation/errors';
import { EmailValidation } from './email-validation';

const createSut = (): EmailValidation => new EmailValidation('email');

describe('EmailValidation', () => {
  it('Should return error with invalid email', () => {
    const sut = createSut();
    const result = sut.validate(faker.random.word());
    expect(result).toEqual(new EmailError());
  });
});
