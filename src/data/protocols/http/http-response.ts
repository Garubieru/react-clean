export enum HttpStatusCode {
  unauthorized = 401,
  noContent = 204,
  badRequest = 400,
  ok = 200,
  notFound = 404,
  serverError = 500,
  forbidden = 403,
  created = 201,
}

export type HttpResponse<TBody> = {
  statusCode: HttpStatusCode;
  body?: TBody;
};
