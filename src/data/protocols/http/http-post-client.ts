export type HttpPostParams = {
  url: string;
  body: unknown;
};

export interface HttpPostClient {
  post: (params: HttpPostParams) => Promise<void>;
}
