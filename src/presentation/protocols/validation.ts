export type ValidationFieldValues = { [field: string]: string | null };

export interface Validation {
  validate: <T extends ValidationFieldValues>(values: T) => T;
}
