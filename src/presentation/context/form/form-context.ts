import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export type FormContextState = {
  email?: string;
  emailError?: string;
  password?: string;
  passwordError?: string;
  mainError?: string;
  isLoading?: boolean;
};

type FormContextProtocol = {
  state?: FormContextState;
  setState?: Dispatch<SetStateAction<FormContextState>>;
};

export const FormContext = createContext<FormContextProtocol>(null);

export const useForm = (): FormContextProtocol => useContext(FormContext);
