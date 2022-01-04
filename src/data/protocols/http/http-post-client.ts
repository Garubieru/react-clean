import { HttpResponse } from '.';

export type HttpPostParams<T> = {
  url: string;
  body?: T;
};

export interface HttpPostClient<TParams, TResponse> {
  post: (params: HttpPostParams<TParams>) => Promise<HttpResponse<TResponse>>;
}
