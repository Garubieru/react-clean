import React from 'react';
import Styles from './styles.scss';
import { useForm } from '@/presentation/context/form/form-context';

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Input: React.FC<InputProps> = ({ placeholder, ...props }) => {
  const { state, setState } = useForm();

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>): void => {
    const currentInput = e.currentTarget;
    currentInput.readOnly = false;
    const wrapper = e.target.parentElement;
    wrapper.setAttribute('data-showStatus', 'true');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState((state) => ({ ...state, [props.name]: e.target.value }));
  };

  const error = state[`${props.name}Error`];

  return (
    <div
      className={Styles.inputWrapper}
      data-showstatus={false}
      data-status={error ? 'warning' : 'success'}
      data-testid={`${props.name}-input-wrap`}
    >
      <input
        className={Styles.styledInput}
        data-testid={props.name}
        readOnly
        placeholder=" "
        onFocus={handleFocus}
        onChange={handleChange}
        {...props}
      />
      <span data-testid={`${props.name}-input-status`} className={Styles.inputErrorMsg}>
        {error}
      </span>

      <label className={Styles.inputPlaceholder}>{placeholder}</label>
    </div>
  );
};

export default Input;
