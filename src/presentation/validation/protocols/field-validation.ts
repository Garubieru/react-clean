export interface FieldValidation {
  validate: (value: string, values?: unknown) => Error;
}
