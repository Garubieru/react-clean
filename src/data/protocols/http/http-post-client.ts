import { HttpResponse } from './http-response';

export type HttpPostParams<T> = {
  url: string;
  body?: T;
};

export interface HttpPostClient<TParams, TResponse> {
  post: (params: HttpPostParams<TParams>) => Promise<HttpResponse<TResponse>>;
}
