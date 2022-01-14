export class CompareFieldError extends Error {
  constructor() {
    super('Fields must be equal');
    this.name = 'CompareFieldError';
  }
}
