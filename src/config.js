export const ANALYTICS_ID = process.env.REACT_APP_ANALYTICS_ID;

export const isTrackingEnabled = () => Boolean(ANALYTICS_ID);

export const TRACKING_EVENTS = {
  OPEN_CHANNEL: 'OPEN_CHANNEL',
  CLOSE_CHANNEL: 'CLOSE_CHANNEL'
};

/* eslint-disable max-len */
const CHANNEL_11_URL = 'https://kancdn.medonecdn.net/livehls/oil/kancdn-live/live/kan11/live.livx/playlist.m3u8?renditions&fmp4';
const CHANNEL_12_URL = 'https://mako-streaming.akamaized.net/stream/hls/live/2033791/k12dvr/index.m3u8';
const CHANNEL_12_TICKET_PREFETCH_URL = 'https://mass.mako.co.il/ClicksStatistics/entitlementsServicesV2.jsp?et=ngt&lp=/stream/hls/live/2033791/k12dvr/index.m3u8?b-in-range=800-2700&rv=AKAMAI';
const CHANNEL_13_URL = 'https://d198ztbnlup2iq.cloudfront.net/out/v1/2d9050c90fb94df8b78d1d98306a1a65/index_1.m3u8';
const I24_NEWS_URL = 'https://i24newshebrew-cdn.encoders.immergo.tv/2/streamPlaylist.m3u8';

export const channels = [
  {
    name: 'רשת 13',
    url: CHANNEL_13_URL
  },
  {
    name: 'קשת 12',
    url: CHANNEL_12_URL,
    async prefetch() {
      try {
        const res = await fetch(CHANNEL_12_TICKET_PREFETCH_URL);

        const resJson = await res.json();

        // eslint-disable-next-line no-param-reassign
        this.url = this.url.includes('?') ? this.url : `${this.url}?${resJson.tickets[0].ticket}`;

        return true;
      } catch (error) {
        return false;
      }
    }
  },
  {
    name: 'כאן 11',
    url: CHANNEL_11_URL
  },
  {
    name: 'i24News',
    url: I24_NEWS_URL
  }
];
