import React, { useEffect, useRef, useState } from 'react';
import { ChannelsNav } from '../../components/ChannelsNav/ChannelsNav';
import { ChannelVideo } from '../../components/ChannelVideo/ChannelVideo';
import { FadingBox } from '../../components/FadingBox/FadingBox';
import { channels, TRACKING_EVENTS } from '../../config';
import { trackChannelEvent } from '../../utils';
import styles from './ChannelsPage.module.css';

const NEXT_KEYS = ['PageUp', 'ChannelUp'];
const PREV_KEYS = ['PageDown', 'ChannelDown'];

export const ChannelsPage = () => {
  const [channelIndex, setChannelIndex] = useState(null);
  // Mirrors channelIndex so rapid key presses see the latest value before re-render.
  const indexRef = useRef(null);
  const navRef = useRef(null);
  const isOpen = channelIndex !== null;
  const focusedChannel = isOpen ? channels[channelIndex] : null;

  const openChannel = index => {
    trackChannelEvent(TRACKING_EVENTS.OPEN_CHANNEL, channels[index].name);
    indexRef.current = index;
    setChannelIndex(index);
  };

  const closeChannel = () => {
    trackChannelEvent(TRACKING_EVENTS.CLOSE_CHANNEL);
    navRef.current.querySelectorAll('button')[indexRef.current].focus();
    indexRef.current = null;
    setChannelIndex(null);
  };

  const stepChannel = step => {
    openChannel((indexRef.current + step + channels.length) % channels.length);
  };

  useEffect(() => {
    const onKeyDown = e => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const digit = Number(e.key);
      if (digit >= 1 && digit <= channels.length) {
        openChannel(digit - 1);
        return;
      }
      if (indexRef.current === null) return;

      if (e.key === 'Escape') {
        closeChannel();
      } else if (NEXT_KEYS.includes(e.key)) {
        e.preventDefault();
        stepChannel(1);
      } else if (PREV_KEYS.includes(e.key)) {
        e.preventDefault();
        stepChannel(-1);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  return (
    <main className={styles.wrap}>
      <header className={styles.header}>
        <span className={styles.liveDot} />
        <h1 className={styles.title}>שידור חי</h1>
      </header>
      <ChannelsNav ref={navRef} onChannelClick={openChannel} />
      <FadingBox shouldShow={isOpen}>
        {focusedChannel && (
          <ChannelVideo
            key={focusedChannel.name}
            channel={focusedChannel}
            onCloseClick={closeChannel}
            onPrevClick={() => stepChannel(-1)}
            onNextClick={() => stepChannel(1)}
          />
        )}
      </FadingBox>
    </main>
  );
};
