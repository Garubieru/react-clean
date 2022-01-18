import React from 'react';
import Styles from './styles.scss';

interface FormContainerProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
}

const FormContainer: React.FC<FormContainerProps> = ({
  title,
  children,
  className,
  ...rest
}) => {
  return (
    <div className={`${Styles.form}`} {...rest}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default FormContainer;
