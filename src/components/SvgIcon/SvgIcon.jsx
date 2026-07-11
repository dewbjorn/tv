import React from 'react';
import styles from './SvgIcon.module.css';

export const SvgIcon = ({ Icon, color, size, className, ...props }) => (
  <i
    className={`${styles.icon}${className ? ` ${className}` : ''}`}
    style={{ color, width: size, height: size }}
    {...props}
  >
    <Icon />
  </i>
);
