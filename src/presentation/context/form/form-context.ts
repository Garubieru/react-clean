import { createContext, useContext } from 'react';

export const FormContext = createContext(null);

export const useForm = (): any => useContext(FormContext);
