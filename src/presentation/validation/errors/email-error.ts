export class EmailError extends Error {
  constructor() {
    super('Invalid email');
    this.name = 'EmailError';
  }
}
