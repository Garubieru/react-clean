import React from 'react';
import Styles from './styles.scss';
import { faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState((state) => ({ ...state, [props.name]: e.target.value }));
  };

  const error = state[`${props.name}Error`];
  const getStatus = (): JSX.Element => (
    <FontAwesomeIcon
      icon={error ? faExclamationCircle : faCheckCircle}
      className={Styles[`icon-${error ? 'warning' : 'success'}`]}
      data-testid={`${props.name}-icon-status`}
    />
  );

  return (
    <div className={Styles.inputWrapper}>
      <input
        data-testid={props.name}
        onFocus={handleFocus}
        readOnly
        onChange={handleChange}
        placeholder=" "
        {...props}
      />
      <span className={Styles.info} data-testid={`${props.name}-status`}>
        {getStatus()}
        {error && <div className={Styles.errorMsg}>{error}</div>}
      </span>
      <label className={Styles.inputPlaceholder}>{placeholder}</label>
    </div>
  );
};

export default Input;
