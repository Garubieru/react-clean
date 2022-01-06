export interface EmailValidatorProtocol {
  validate: (value: string) => boolean;
}
