import { EmailValidator } from './email-validator';
import isEmail from 'email-validator';
import faker from 'faker';

const createSut = (): EmailValidator => {
  const sut = new EmailValidator();
  return sut;
};

const validateSut = (sut: EmailValidator, email = faker.internet.email()): boolean => {
  return sut.validate(email);
};

const isEmailSpy = jest.spyOn(isEmail, 'validate');

describe('EmailValidator', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should call isEmail.validate with correct value', () => {
    const sut = createSut();
    const email = faker.internet.email();
    validateSut(sut, email);
    expect(isEmailSpy).toHaveBeenCalledWith(email);
  });

  it('Should return true when email is valid', () => {
    const sut = createSut();
    validateSut(sut);
    expect(isEmailSpy.mock.results[0].value).toBeTruthy();
  });

  it('Should return false when email is invalid', () => {
    const sut = createSut();
    validateSut(sut, faker.random.words());
    expect(isEmailSpy.mock.results[0].value).toBeFalsy();
  });
});
