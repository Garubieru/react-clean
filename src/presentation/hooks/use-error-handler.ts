import { useLogout } from '@/presentation/hooks';
import { ForbiddenError } from '@/domain/errors';

type ErrorCallBack = (error: Error) => void;
type ErrorResult = (error: Error) => void;

export const useErrorHandler = (callback: ErrorCallBack): ErrorResult => {
  const logout = useLogout();
  return (error) => {
    if (error instanceof ForbiddenError) {
      logout();
      return;
    }
    callback(error);
  };
};
