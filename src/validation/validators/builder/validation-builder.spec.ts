import { EmailValidator } from '@/infra/validators/email-validator/email-validator';
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
  CompareFieldsValidation,
  ValidationBuilder as sut,
} from '@/validation/validators';

import faker from 'faker';

describe('ValidationBuilder', () => {
  afterEach(() => jest.clearAllMocks());

  it('Should have RequiredFieldValidation', () => {
    const validations = sut.field().required().build();
    expect(validations).toEqual([new RequiredFieldValidation()]);
  });

  it('Should have MinLengthValidation', () => {
    const length = faker.datatype.number();
    const validations = sut.field().min(length).build();
    expect(validations).toEqual([new MinLengthValidation(length)]);
  });

  it('Should have EmailValidation', () => {
    const validations = sut.field().isEmail().build();
    expect(validations).toEqual([new EmailValidation(new EmailValidator())]);
  });

  it('Should have CompareFieldsValidation', () => {
    const fieldToCompare = faker.database.column();
    const validations = sut.field().isEqual(fieldToCompare).build();
    expect(validations).toEqual([new CompareFieldsValidation(fieldToCompare)]);
  });

  it('Should return a list of validations', () => {
    const length = faker.datatype.number();
    const fieldToCompare = faker.database.column();
    const validations = sut
      .field()
      .required()
      .min(length)
      .isEmail()
      .isEqual(fieldToCompare)
      .build();
    expect(validations).toEqual([
      new RequiredFieldValidation(),
      new MinLengthValidation(length),
      new EmailValidation(new EmailValidator()),
      new CompareFieldsValidation(fieldToCompare),
    ]);
  });
});
