import { EmailValidator } from '@/infra/validators/email-validator/email-validator';
import { RequiredFieldValidation } from '@/presentation/validation/validators';
import { EmailValidation } from '../email/email-validation';
import { MinLengthValidation } from '../min-length/min-length-validation';
import { ValidationBuilder as sut } from './validation-builder';

describe('ValidationBuilder', () => {
  afterEach(() => jest.clearAllMocks());

  it('Should have RequiredFieldValidation', () => {
    const fieldName = 'any_field';
    const validations = sut.field(fieldName).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)]);
  });

  it('Should have MinLengthValidation', () => {
    const fieldName = 'any_field';
    const validations = sut.field(fieldName).min(5).build();
    expect(validations).toEqual([new MinLengthValidation(fieldName, 5)]);
  });

  it('Should return EmailValidation', () => {
    const fieldName = 'any_field';
    const validations = sut.field(fieldName).isEmail().build();
    expect(validations).toEqual([new EmailValidation(fieldName, new EmailValidator())]);
  });
});
