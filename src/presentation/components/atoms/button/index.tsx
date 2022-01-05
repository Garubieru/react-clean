import React from 'react';
import Spinner from '../spinner';
import Styles from './styles.scss';

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  isLoading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ isLoading, ...props }) => {
  return (
    <button className={Styles.button} {...props}>
      {!isLoading && props.children}
      {isLoading && <Spinner />}
    </button>
  );
};

export default Button;
