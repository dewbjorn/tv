import React from 'react';
import { channels } from '../../config';
import styles from './ChannelsNav.module.css';

export const ChannelsNav = ({ onChannelClick }) => (
  <div className={styles.grid}>
    {channels.map((channel, index) => (
      <button
        key={channel.name}
        type="button"
        className={styles.card}
        style={{ '--channel-color': channel.color }}
        onClick={() => onChannelClick(channel)}
      >
        <span className={styles.number}>{index + 1}</span>
        <span className={styles.name}>{channel.name}</span>
      </button>
    ))}
  </div>
);
