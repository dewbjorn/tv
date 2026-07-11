import React from 'react';
import styles from './FadingBox.module.css';

export const FadingBox = ({ shouldShow, children }) => (
  <div className={`${styles.box} ${shouldShow ? styles.visible : styles.hidden}`}>
    {children}
  </div>
);
