import faker from 'faker';
import { InvalidFieldError } from '@/validation/errors';
import { EmailValidation } from '@/validation/validators';
import { EmailValidatorSpy } from '@/validation/test';

type SutTypes = {
  sut: EmailValidation;
  emailValidatorSpy: EmailValidatorSpy;
};

const createSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy();
  const sut = new EmailValidation(emailValidatorSpy);
  return { sut, emailValidatorSpy };
};

describe('EmailValidation', () => {
  it('Should call EmailValidator with correct value', () => {
    const { sut, emailValidatorSpy } = createSut();
    const value = faker.internet.email();
    sut.validate(value);
    expect(emailValidatorSpy.value).toEqual(value);
  });

  it('Should not return error when value is valid', () => {
    const { sut } = createSut();
    const result = sut.validate(faker.internet.email());
    expect(result).toBeFalsy();
  });

  it('Should return error when value is invalid', () => {
    const { sut, emailValidatorSpy } = createSut();
    emailValidatorSpy.valid = false;
    const result = sut.validate(faker.random.word());
    expect(result).toEqual(new InvalidFieldError('Invalid email'));
  });
});
