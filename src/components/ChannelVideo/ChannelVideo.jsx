import React, { useEffect, useRef, useState } from 'react';
import { useHls } from '../../hooks/useHls';
import { CloseButton } from '../CloseButton/CloseButton';
import { SvgIcon } from '../SvgIcon/SvgIcon';
import chevron from './chevron.svg?react';
import styles from './ChannelVideo.module.css';

const IDLE_MS = 3000;

export const ChannelVideo = ({ channel, onCloseClick, onPrevClick, onNextClick }) => {
  const videoRef = useRef(null);
  const idleTimer = useRef(null);
  const isMounted = useRef(true);
  const [isIdle, setIsIdle] = useState(false);
  const [prefetchStatus, setPrefetchStatus] = useState(channel.prefetch ? 'loading' : 'done');

  const runPrefetch = async () => {
    setPrefetchStatus('loading');
    const ok = await channel.prefetch();
    if (isMounted.current) setPrefetchStatus(ok ? 'done' : 'error');
  };

  useEffect(() => {
    if (channel.prefetch) runPrefetch();
    return () => {
      isMounted.current = false;
    };
  }, [channel]);

  const sourceUrl = prefetchStatus === 'done' ? channel.url : null;
  const { status: hlsStatus, retry: retryHls } = useHls(videoRef, sourceUrl);
  const status = prefetchStatus === 'done' ? hlsStatus : prefetchStatus;

  useEffect(() => {
    if (status === 'ready') {
      videoRef.current.play().catch(error => {
        // Switching channels mid-load aborts the pending play(); that is expected.
        if (error.name !== 'AbortError') throw error;
      });
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
    window.addEventListener('keydown', wake);
    return () => {
      clearTimeout(idleTimer.current);
      window.removeEventListener('keydown', wake);
    };
  }, []);

  const retry = () => (prefetchStatus === 'error' ? runPrefetch() : retryHls());

  const showChrome = !isIdle || status !== 'ready';

  return (
    <div
      className={`${styles.wrapper} ${showChrome ? '' : styles.idle}`}
      onMouseMove={wake}
      onTouchStart={wake}
    >
      <video className={styles.video} controls={status === 'ready'} ref={videoRef} />

      <div className={`${styles.topBar} ${showChrome ? '' : styles.hidden}`}>
        <h2 className={styles.channelName}>
          <span className={styles.liveBadge}>LIVE</span>
          {channel.name}
        </h2>
        <div className={styles.controls}>
          <button
            type="button"
            className={`${styles.iconButton} ${styles.prev}`}
            onClick={onPrevClick}
            aria-label="ערוץ קודם"
          >
            <SvgIcon Icon={chevron} />
          </button>
          <button
            type="button"
            className={styles.iconButton}
            onClick={onNextClick}
            aria-label="ערוץ הבא"
          >
            <SvgIcon Icon={chevron} />
          </button>
          <CloseButton onClick={onCloseClick} />
        </div>
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
