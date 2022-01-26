export interface FieldValidation {
  validate: (value: string, values?: Record<string, unknown>) => Error;
}
