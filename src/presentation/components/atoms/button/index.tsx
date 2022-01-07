import React from 'react';
import Spinner from '../spinner';
import Styles from './styles.scss';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ isLoading, disabled, ...props }) => {
  return (
    <button className={Styles.button} disabled={disabled || isLoading} {...props}>
      {!isLoading && props.children}
      {isLoading && <Spinner data-testid="spinner" />}
    </button>
  );
};

export default Button;
