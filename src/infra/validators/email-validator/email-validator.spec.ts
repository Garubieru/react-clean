import { EmailValidator } from './email-validator';
import isEmail from 'email-validator';
import faker from 'faker';

const createSut = (): EmailValidator => {
  const sut = new EmailValidator();
  return sut;
};

const isEmailSpy = jest.spyOn(isEmail, 'validate');

describe('EmailValidator', () => {
  beforeEach(() => jest.clearAllMocks());
  it('Should call isEmail.validate with correct value', () => {
    const sut = createSut();
    const email = faker.internet.email();
    sut.validate(email);
    expect(isEmailSpy).toHaveBeenCalledWith(email);
  });

  it('Should return true when email is valid', () => {
    const sut = createSut();
    sut.validate(faker.internet.email());
    expect(isEmailSpy.mock.results[0].value).toBeTruthy();
  });

  it('Should return false when email is invalid', () => {
    const sut = createSut();
    sut.validate(faker.random.words());
    expect(isEmailSpy.mock.results[0].value).toBeFalsy();
  });

  it('Should return false when email is empty', () => {
    const sut = createSut();
    sut.validate('');
    expect(isEmailSpy.mock.results[0].value).toBeFalsy();
  });
});
