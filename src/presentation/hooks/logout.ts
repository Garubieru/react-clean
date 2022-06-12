import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { loginApiState } from '@/presentation/context/api/api-state';

type UseLogoutResult = () => void;

export const useLogout = (): UseLogoutResult => {
  const { setLoginAccount } = useRecoilValue(loginApiState);
  const navigate = useNavigate();
  return () => {
    setLoginAccount(null);
    navigate('/login');
  };
};
