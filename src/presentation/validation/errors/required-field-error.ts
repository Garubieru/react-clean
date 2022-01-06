export class RequiredFieldError extends Error {
  constructor() {
    super('Field is required');
    this.name = 'RequiredFieldError';
  }
}
