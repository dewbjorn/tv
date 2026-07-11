import React, { useState } from 'react';
import { ChannelsNav } from '../../components/ChannelsNav/ChannelsNav';
import { ChannelVideo } from '../../components/ChannelVideo/ChannelVideo';
import { FadingBox } from '../../components/FadingBox/FadingBox';
import { TRACKING_EVENTS } from '../../config';
import { trackChannelEvent } from '../../utils';
import styles from './ChannelsPage.module.css';

export const ChannelsPage = () => {
  const [focusedChannel, setFocusedChannel] = useState(null);

  const openChannel = async channel => {
    if (channel.prefetch) {
      const ok = await channel.prefetch();
      if (!ok) {
        alert('Failed streaming channel, please try again');
        return;
      }
    }
    trackChannelEvent(TRACKING_EVENTS.OPEN_CHANNEL, channel.name);
    setFocusedChannel(channel);
  };

  const closeChannel = () => {
    trackChannelEvent(TRACKING_EVENTS.CLOSE_CHANNEL);
    setFocusedChannel(null);
  };

  return (
    <div className={styles.wrap}>
      <ChannelsNav onChannelClick={openChannel} />
      <FadingBox shouldShow={Boolean(focusedChannel)}>
        {focusedChannel && (
          <ChannelVideo onCloseClick={closeChannel} sourceUrl={focusedChannel.url} />
        )}
      </FadingBox>
    </div>
  );
};
