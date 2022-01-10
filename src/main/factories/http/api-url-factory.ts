export const createApiUrl = (path: string): string => {
  return `${process.env.API_URL}${path}`;
};
