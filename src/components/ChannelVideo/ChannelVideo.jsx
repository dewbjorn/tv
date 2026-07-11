import React, { useEffect, useRef } from 'react';
import { useHls } from '../../hooks/useHls';
import { CloseButton } from '../CloseButton/CloseButton';
import styles from './ChannelVideo.module.css';

export const ChannelVideo = ({ sourceUrl, onCloseClick }) => {
  const videoRef = useRef(null);
  const { isReady } = useHls(videoRef, sourceUrl);

  useEffect(() => {
    if (isReady) {
      videoRef.current.play();
      videoRef.current.focus();
    }
  }, [isReady]);

  const onKeyDown = e => {
    if (e.key === 'Escape') {
      onCloseClick();
    }
  };

  return (
    <div className={styles.wrapper} onKeyDown={onKeyDown}>
      <div className={styles.titleBar}>
        <CloseButton onClick={onCloseClick} color="#f00" />
      </div>
      <video className={styles.video} controls ref={videoRef} src={sourceUrl} />
    </div>
  );
};
