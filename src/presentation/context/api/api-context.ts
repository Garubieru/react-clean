import { createContext, useContext } from 'react';
import { AccountModel } from '@/domain/models';

export type ApiContextProtocol = {
  setLoginAccount?: (account: AccountModel) => void;
  getLoginAccount?: (key: string) => AccountModel;
};

export const ApiContext = createContext<ApiContextProtocol>(null);

export const useApi = (): ApiContextProtocol => useContext(ApiContext);
