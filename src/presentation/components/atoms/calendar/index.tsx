import React from 'react';
import Styles from './styles.scss';

interface CalenderProps
  extends React.DetailedHTMLProps<React.TimeHTMLAttributes<HTMLElement>, HTMLElement> {
  time: Date;
}

const Calendar: React.FC<CalenderProps> = ({ className, ...props }) => {
  return (
    <time className={[Styles.timeContainer, className].join(' ')}>
      <span data-testid="day" className={Styles.day}>
        {props.time.getDate().toString().padStart(2, '0')}
      </span>
      <span data-testid="month" className={Styles.month}>
        {props.time.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}
      </span>
      <span data-testid="year" className={Styles.year}>
        {props.time.getFullYear()}
      </span>
    </time>
  );
};

export default Calendar;
