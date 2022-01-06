import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

import Styles from './styles.scss';

const Link: React.FC<LinkProps> = (props) => {
  return (
    <RouterLink {...props} className={Styles.link}>
      {props.children}
    </RouterLink>
  );
};

export default Link;
