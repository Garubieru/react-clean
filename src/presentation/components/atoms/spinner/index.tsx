import React from 'react';
import Styles from './styles.scss';

interface SpinnerProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Spinner: React.FC<SpinnerProps> = ({ className, ...props }) => {
  return (
    <div {...props} className={[Styles.spinner, className].join(' ')}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Spinner;
