import { HttpResponse } from '.';

export type HttpGetParams<TBody> = {
  url: string;
  body?: TBody;
};

export interface HttpGetClient<T, R> {
  get: (params: HttpGetParams<T>) => Promise<HttpResponse<R>>;
}
