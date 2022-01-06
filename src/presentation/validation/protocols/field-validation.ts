export interface FieldValidation {
  readonly name: string;
  validate: (value: string) => Error;
}
