export class ForbiddenError extends Error {
  constructor() {
    super('Unathorized.');
    this.name = 'UnathorizedError';
  }
}
