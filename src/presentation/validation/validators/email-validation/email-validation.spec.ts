import faker from 'faker';
import { EmailError } from '@/presentation/validation/errors';
import { EmailValidation } from './email-validation';
import { EmailValidatorSpy } from '@/presentation/validation/test';

type SutTypes = {
  sut: EmailValidation;
  emailValidatorSpy: EmailValidatorSpy;
};

const createSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy();
  const sut = new EmailValidation('email', emailValidatorSpy);
  return { sut, emailValidatorSpy };
};

describe('EmailValidation', () => {
  it('Should call EmailValidator with correct value', () => {
    const { sut, emailValidatorSpy } = createSut();
    const value = faker.random.word();
    sut.validate(value);
    expect(emailValidatorSpy.value).toEqual(value);
  });

  it('Should not return error when value is valid', () => {
    const { sut } = createSut();
    const result = sut.validate(faker.random.word());
    expect(result).toBeFalsy();
  });

  it('Should return error when value is invalid', () => {
    const { sut, emailValidatorSpy } = createSut();
    jest.spyOn(emailValidatorSpy, 'validate').mockReturnValueOnce(false);
    const result = sut.validate(faker.internet.email());
    expect(result).toEqual(new EmailError());
  });
});
