export interface FieldValidation {
  validate: (value: string) => Error;
}
