import { FieldValidation } from '@/validation/protocols';

export type ValidationFieldValues = { [field: string]: string | null };

export interface Validation {
  validate: <T extends ValidationFieldValues>(values: T) => T;
}

export type ValidationFields = { [fieldName: string]: FieldValidation[] };
