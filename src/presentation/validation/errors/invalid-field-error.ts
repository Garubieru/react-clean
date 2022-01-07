export class InvalidFieldError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EmailError';
  }
}
