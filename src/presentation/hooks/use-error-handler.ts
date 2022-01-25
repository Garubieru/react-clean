import { ForbiddenError } from '@/domain/errors';
import { useApi } from '@/presentation/context/api/api-context';
import { useNavigate } from 'react-router-dom';

type ErrorCallBack = (error: Error) => void;
type ErrorResult = (error: Error) => void;

export const useErrorHandler = (callback: ErrorCallBack): ErrorResult => {
  const { setLoginAccount } = useApi();
  const navigate = useNavigate();
  return (error) => {
    if (error instanceof ForbiddenError) {
      setLoginAccount(null);
      navigate('/login');
      return;
    }
    callback(error);
  };
};
