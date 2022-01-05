import React from 'react';
import Styles from './styles.scss';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from '@/presentation/context/form/form-context';

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Input: React.FC<InputProps> = (props) => {
  const { errorState } = useForm();

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>): void => {
    const currentInput = e.currentTarget;
    currentInput.readOnly = false;
  };

  const getError = (): string => errorState[props.name];
  const getStatus = (): JSX.Element => <FontAwesomeIcon icon={faExclamationCircle} />;

  return (
    <div className={Styles.inputWrapper}>
      <input {...props} onFocus={handleFocus} readOnly />
      <span data-testid={`${props.name}-status`}>
        {getStatus()}
        <div>{getError()}</div>
      </span>
    </div>
  );
};

export default Input;
