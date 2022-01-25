import { useNavigate } from 'react-router-dom';
import { useApi } from '../context/api/api-context';

type UseLogoutResult = () => void;

export const useLogout = (): UseLogoutResult => {
  const { setLoginAccount } = useApi();
  const navigate = useNavigate();
  return () => {
    setLoginAccount(null);
    navigate('/login');
  };
};
