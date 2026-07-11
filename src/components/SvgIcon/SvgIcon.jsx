import React from 'react';
import styles from './SvgIcon.module.css';

export const SvgIcon = ({ Icon, color, size, className, ...props }) => (
  <i
    className={`${styles.icon}${className ? ` ${className}` : ''}`}
    {...props}
  >
    <Icon style={{ color, width: size, height: size }} />
  </i>
);
