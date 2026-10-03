import React, { useState } from 'react';
import { ChannelsNav } from '../../components/ChannelsNav/ChannelsNav';
import { ChannelVideo } from '../../components/ChannelVideo/ChannelVideo';
import { FadingBox } from '../../components/FadingBox/FadingBox';
import { TRACKING_EVENTS } from '../../config';
import { trackChannelEvent } from '../../utils';
import styles from './ChannelsPage.module.css';

export const ChannelsPage = () => {
  const [focusedChannel, setFocusedChannel] = useState(null);

  const openChannel = channel => {
    trackChannelEvent(TRACKING_EVENTS.OPEN_CHANNEL, channel.name);
    setFocusedChannel(channel);
  };

  const closeChannel = () => {
    trackChannelEvent(TRACKING_EVENTS.CLOSE_CHANNEL);
    setFocusedChannel(null);
  };

  return (
    <main className={styles.wrap}>
      <header className={styles.header}>
        <span className={styles.liveDot} />
        <h1 className={styles.title}>שידור חי</h1>
      </header>
      <ChannelsNav onChannelClick={openChannel} />
      <FadingBox shouldShow={Boolean(focusedChannel)}>
        {focusedChannel && (
          <ChannelVideo
            key={focusedChannel.name}
            channel={focusedChannel}
            onCloseClick={closeChannel}
          />
        )}
      </FadingBox>
    </main>
  );
};
