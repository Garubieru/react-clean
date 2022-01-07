import { EmailValidator } from '@/infra/validators/email-validator/email-validator';
import { RequiredFieldValidation } from '@/presentation/validation/validators';
import { EmailValidation } from '../email/email-validation';
import { MinLengthValidation } from '../min-length/min-length-validation';
import { ValidationBuilder as sut } from './validation-builder';
import faker from 'faker';

describe('ValidationBuilder', () => {
  afterEach(() => jest.clearAllMocks());

  it('Should have RequiredFieldValidation', () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)]);
  });

  it('Should have MinLengthValidation', () => {
    const fieldName = faker.database.column();
    const length = faker.datatype.number();
    const validations = sut.field(fieldName).min(length).build();
    expect(validations).toEqual([new MinLengthValidation(fieldName, length)]);
  });

  it('Should have EmailValidation', () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).isEmail().build();
    expect(validations).toEqual([new EmailValidation(fieldName, new EmailValidator())]);
  });

  it('Should return a list of validations', () => {
    const length = faker.datatype.number();
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).required().min(length).isEmail().build();
    expect(validations).toEqual([
      new RequiredFieldValidation(fieldName),
      new MinLengthValidation(fieldName, length),
      new EmailValidation(fieldName, new EmailValidator()),
    ]);
  });
});
