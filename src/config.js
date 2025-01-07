export const ANALYTICS_ID = process.env.REACT_APP_ANALYTICS_ID;

export const isTrackingEnabled = () => Boolean(ANALYTICS_ID) === true;

export const TRACKING_EVENTS = {
  OPEN_CHANNEL: 'OPEN_CHANNEL',
  CLOSE_CHANNEL: 'CLOSE_CHANNEL'
};

/* eslint-disable max-len */
const CHANNEL_11_URL = 'https://kan11.media.kan.org.il/hls/live/2024514/2024514/master.m3u8';
const CHANNEL_12_URL = 'https://mako-streaming.akamaized.net/stream/hls/live/2033791/k12dvr/profile/2/hdntl=exp=1736367736~acl=%2f*~data=hdntl~hmac=fdc17916112fa4ed187598cecefb1634559019d165d6c4c7c53cd206fec9a31d/profileManifest.m3u8?_uid=933ca634-2ca6-4f46-8a53-fb7d69ed09e8&rK=a1&_did=Wc835878434aa59257e22a2ceef0d8522461';
const CHANNEL_12_TICKET_PREFETCH_URL = 'https://mass.mako.co.il/ClicksStatistics/entitlementsServicesV2.jsp?et=ngt&lp=/stream/hls/live/2033791/k12dvr/index.m3u8?b-in-range=800-2700&rv=AKAMAI';
const CHANNEL_13_URL = 'https://reshet.g-mana.live/media/87f59c77-03f6-4bad-a648-897e095e7360/mainManifest.m3u8';
const I24_NEWS_URL = 'https://bcovlive-a.akamaihd.net/54b8e6b753e3409c91856201d1f08731/eu-central-1/5377161796001/playlist.m3u8';
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
