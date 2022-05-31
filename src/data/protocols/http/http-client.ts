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

export type HttpResponse<R = any> = {
  statusCode: HttpStatusCode;
  body?: R;
};

export type HttpMethods = 'post' | 'get' | 'put' | 'delete';

export type HttpRequest = {
  url: string;
  method: HttpMethods;
  headers?: { [key: string]: any };
  body?: any;
};

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>;
}
