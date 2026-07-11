import React from 'react';
import close from './close.svg?react';
import { SvgIcon } from '../SvgIcon/SvgIcon';
import styles from './CloseButton.module.css';

export const CloseButton = ({ color, onClick }) => (
  <button type="button" className={styles.button} onClick={onClick}>
    <SvgIcon Icon={close} color={color} />
  </button>
);
