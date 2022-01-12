import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export type FormContextProtocol = {
  state?: any;
  setState?: Dispatch<SetStateAction<any>>;
};

export const FormContext = createContext<FormContextProtocol>(null);

export const useForm = (): FormContextProtocol => useContext(FormContext);
