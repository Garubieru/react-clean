import React from 'react';

import Styles from './styles.scss';

type LinkProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

const Link: React.FC<LinkProps> = (props) => {
  return (
    <a {...props} className={Styles.link}>
      {props.children}
    </a>
  );
};

export default Link;
