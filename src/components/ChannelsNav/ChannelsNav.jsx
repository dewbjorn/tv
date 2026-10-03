import React, { forwardRef } from 'react';
import { channels } from '../../config';
import styles from './ChannelsNav.module.css';

const moveFocus = (grid, key) => {
  const buttons = [...grid.querySelectorAll('button')];
  const current = buttons.indexOf(document.activeElement);
  if (current === -1) return false;

  const columns = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
  // Grid is RTL, so ArrowLeft moves forward in the list.
  const steps = { ArrowLeft: 1, ArrowRight: -1, ArrowDown: columns, ArrowUp: -columns };
  const target = buttons[current + steps[key]];
  if (target) target.focus();
  return true;
};

export const ChannelsNav = forwardRef(({ onChannelClick }, ref) => {
  const onKeyDown = e => {
    if (e.key.startsWith('Arrow') && moveFocus(e.currentTarget, e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.grid} ref={ref} onKeyDown={onKeyDown}>
      {channels.map((channel, index) => (
        <button
          key={channel.name}
          type="button"
          className={styles.card}
          style={{ '--channel-color': channel.color }}
          onClick={() => onChannelClick(index)}
        >
          <span className={styles.number}>{index + 1}</span>
          <span className={styles.name}>{channel.name}</span>
        </button>
      ))}
    </div>
  );
});
