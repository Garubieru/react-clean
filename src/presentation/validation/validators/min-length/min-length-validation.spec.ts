import { MinLengthValidation } from './min-length-validation';
import { InvalidFieldError } from '../../errors';
import faker from 'faker';

const createSut = (length = 5): MinLengthValidation => {
  return new MinLengthValidation('length', length);
};

describe('MinLengthValidation', () => {
  it('Should call MinLengthValidation with correct values', () => {
    const sut = createSut(3);
    expect(sut.length).toBe(3);
  });

  it('Should return Error if value is invalid', () => {
    const sut = createSut();
    const result = sut.validate(faker.random.alphaNumeric(3));
    expect(result).toEqual(
      new InvalidFieldError(`Value must have more than ${sut.length} characters`),
    );
  });

  it('Should not return Error if value is valid', () => {
    const sut = createSut();
    const result = sut.validate(faker.random.alphaNumeric(10));
    expect(result).toBeFalsy();
  });
});
