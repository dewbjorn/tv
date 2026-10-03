import React from 'react';
import close from './close.svg?react';
import { SvgIcon } from '../SvgIcon/SvgIcon';
import styles from './CloseButton.module.css';

export const CloseButton = ({ onClick }) => (
  <button type="button" className={styles.button} onClick={onClick} aria-label="סגור">
    <SvgIcon Icon={close} />
  </button>
);
