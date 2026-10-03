import React, { useEffect, useRef, useState } from 'react';
import { useHls } from '../../hooks/useHls';
import { CloseButton } from '../CloseButton/CloseButton';
import styles from './ChannelVideo.module.css';

const IDLE_MS = 3000;

export const ChannelVideo = ({ channel, onCloseClick }) => {
  const videoRef = useRef(null);
  const idleTimer = useRef(null);
  const [isIdle, setIsIdle] = useState(false);
  const [prefetchStatus, setPrefetchStatus] = useState(channel.prefetch ? 'loading' : 'done');

  const runPrefetch = async () => {
    setPrefetchStatus('loading');
    const ok = await channel.prefetch();
    setPrefetchStatus(ok ? 'done' : 'error');
  };

  useEffect(() => {
    if (channel.prefetch) runPrefetch();
  }, [channel]);

  const sourceUrl = prefetchStatus === 'done' ? channel.url : null;
  const { status: hlsStatus, retry: retryHls } = useHls(videoRef, sourceUrl);
  const status = prefetchStatus === 'done' ? hlsStatus : prefetchStatus;

  useEffect(() => {
    if (status === 'ready') {
      videoRef.current.play();
      videoRef.current.focus();
    }
  }, [status]);

  const wake = () => {
    setIsIdle(false);
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIsIdle(true), IDLE_MS);
  };

  useEffect(() => {
    wake();
    return () => clearTimeout(idleTimer.current);
  }, []);

  const retry = () => (prefetchStatus === 'error' ? runPrefetch() : retryHls());

  const onKeyDown = e => {
    wake();
    if (e.key === 'Escape') {
      onCloseClick();
    }
  };

  const showChrome = !isIdle || status !== 'ready';

  return (
    <div
      className={`${styles.wrapper} ${showChrome ? '' : styles.idle}`}
      onKeyDown={onKeyDown}
      onMouseMove={wake}
      onTouchStart={wake}
    >
      <video className={styles.video} controls={status === 'ready'} ref={videoRef} />

      <div className={`${styles.topBar} ${showChrome ? '' : styles.hidden}`}>
        <h2 className={styles.channelName}>
          <span className={styles.liveBadge}>LIVE</span>
          {channel.name}
        </h2>
        <CloseButton onClick={onCloseClick} />
      </div>

      {status === 'loading' && (
        <div className={styles.center}>
          <div className={styles.spinner} role="status" aria-label="טוען" />
        </div>
      )}

      {status === 'error' && (
        <div className={styles.center}>
          <p className={styles.errorText}>לא הצלחנו לטעון את הערוץ</p>
          <button type="button" className={styles.retryButton} onClick={retry}>
            נסה שוב
          </button>
        </div>
      )}
    </div>
  );
};
