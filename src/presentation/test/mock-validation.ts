import { Validation, ValidationFieldValues } from '../protocols/validation';

export class ValidationStub implements Validation {
  errorMessage: string | null = null;

  validate<T extends ValidationFieldValues>(values: T): T {
    const fields = Object.keys(values);
    return fields.reduce(
      (ac, field) => ({
        ...ac,
        [field]: this.errorMessage,
      }),
      {},
    ) as T;
  }
}
