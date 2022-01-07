export const createApiLoginUrl = (path: string): string => {
  return `${process.env.API_URL}${path}`;
};
