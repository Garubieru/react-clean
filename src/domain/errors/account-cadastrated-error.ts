export class AccountCadastratedError extends Error {
  constructor() {
    super('E-mail already in use');
  }
}
