import Hls from 'hls.js';
import { useEffect, useState } from 'react';

export const useHls = (videoRef, sourceUrl) => {
  const [status, setStatus] = useState('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    setStatus('loading');
    if (!sourceUrl) return undefined;

    if (Hls.isSupported()) {
      const hls = new Hls({ maxBufferSize: 10 * 1000 });
      hls.on(Hls.Events.MANIFEST_PARSED, () => setStatus('ready'));
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) setStatus('error');
      });
      hls.loadSource(sourceUrl);
      hls.attachMedia(video);
      return () => hls.destroy();
    }

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      const onReady = () => setStatus('ready');
      const onError = () => setStatus('error');
      video.addEventListener('loadedmetadata', onReady);
      video.addEventListener('error', onError);
      video.src = sourceUrl;
      return () => {
        video.removeEventListener('loadedmetadata', onReady);
        video.removeEventListener('error', onError);
        video.removeAttribute('src');
        video.load();
      };
    }

    setStatus('error');
    return undefined;
  }, [videoRef, sourceUrl, attempt]);

  const retry = () => setAttempt(n => n + 1);

  return { status, retry };
};
