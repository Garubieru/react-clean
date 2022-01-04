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
  return (
    <div className={Styles.inputWrapper}>
      <input {...props} />
      <span>
        <FontAwesomeIcon icon={faExclamationCircle} />
      </span>
    </div>
  );
};

export default Input;