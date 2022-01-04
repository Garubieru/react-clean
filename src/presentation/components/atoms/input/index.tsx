import React from 'react';
import Styles from './styles.scss';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  errorMsg?: string;
};

const Input: React.FC<InputProps> = ({ errorMsg, ...props }) => {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>): void => {
    const currentInput = e.currentTarget;

    currentInput.readOnly = false;
    
  };
  return (
    <div className={Styles.inputWrapper}>
      <input {...props} readOnly onFocus={handleFocus} />
      <span>
        <FontAwesomeIcon icon={faExclamationCircle} />
      </span>
    </div>
  );
};

export default Input;
