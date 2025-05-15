export const ANALYTICS_ID = process.env.REACT_APP_ANALYTICS_ID;

export const isTrackingEnabled = () => Boolean(ANALYTICS_ID) === true;

export const TRACKING_EVENTS = {
  OPEN_CHANNEL: 'OPEN_CHANNEL',
  CLOSE_CHANNEL: 'CLOSE_CHANNEL'
};

/* eslint-disable max-len */
const CHANNEL_11_URL = 'https://kan11.media.kan.org.il/hls/live/2024514/2024514/master.m3u8';
const CHANNEL_12_URL = 'https://mako-streaming.akamaized.net/stream/hls/live/2033791/k12makowad/index.m3u8?b-in-range=0-1800&_uid=8b6d7d32-3434-42f8-a115-ce9b04631681&user_id=6cf04f139114b11f566be3fa96891043&dxu=a9d78826-705e-41da-9d38-7147b7db6a1b&hdnea=st%3D1740136674%7Eexp%3D1740137574%7Eacl%3D%2F*%7Ehmac%3D07ba33148e6006c62be39a7d00b7169e7b6c813baa0d1346699840472bbdf07b';
const CHANNEL_12_TICKET_PREFETCH_URL = 'https://mass.mako.co.il/ClicksStatistics/entitlementsServicesV2.jsp?et=egt';
const CHANNEL_13_URL = 'https://d2lckchr9cxrss.cloudfront.net/out/v1/c73af7694cce4767888c08a7534b503c/index.m3u8';
const I24_NEWS_URL = 'https://bcovlive-a.akamaihd.net/d89ede8094c741b7924120b27764153c/eu-central-1/5377161796001/playlist.m3u8';
const SEINFELD_URL = 'https://demo.streamplanet.tv/hls/seinfeld/src/index.m3u8';

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
  },
  {
    name: 'Seinfeld',
    url: SEINFELD_URL
  }
];
