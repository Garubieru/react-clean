import { atom } from 'recoil';
import { AccountModel } from '@/domain/models';

export type ApiState = {
  setLoginAccount?: (account: AccountModel) => void;
  getLoginAccount?: () => AccountModel;
};

export const loginApiState = atom<ApiState>({ key: 'loginApiState', default: null });
