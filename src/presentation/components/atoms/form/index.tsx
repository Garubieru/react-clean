import React from 'react';
import Styles from './styles.scss';

interface FormProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  title: string;
}

const Form: React.FC<FormProps> = ({ title, children, className, ...rest }) => {
  return (
    <form className={`${Styles.form} ${className}`} {...rest}>
      <h2>{title}</h2>
      {children}
    </form>
  );
};

export default Form;
