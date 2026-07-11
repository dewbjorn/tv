import React from 'react';
import { channels } from '../../config';
import styles from './ChannelsNav.module.css';

export const ChannelsNav = ({ onChannelClick }) => (
  <div className={styles.wrap}>
    {channels.map(channel => (
      <button
        key={channel.name}
        type="button"
        className={styles.button}
        onClick={() => onChannelClick(channel)}
      >
        {channel.name}
      </button>
    ))}
  </div>
);
