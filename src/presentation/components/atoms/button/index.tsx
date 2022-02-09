import React from 'react';
import { Spinner } from '@/presentation/components';
import Styles from './styles.scss';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ isLoading, disabled, className, ...props }) => {
  return (
    <button
      className={[Styles.button, className].join(' ')}
      disabled={disabled || isLoading}
      {...props}
    >
      {!isLoading && props.children}
      {isLoading && <Spinner data-testid="spinner" />}
    </button>
  );
};

export default Button;
