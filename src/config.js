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
const CHANNEL_13_URL = 'https://reshet.g-mana.live/media/cdefce3a-14ec-46cc-a147-1275c4a8b9ed/mainManifest.m3u8?player.pal=AQzzBGQE8_l3ygxKxO_pRw8CDA0l03uRL7FEZqilyvQAO1rt0YBuy3ynR9c9xuKM2bQpOEm6H23hX-_JcyeLWbUcRy3gK-JVtJaTMApD6AR1GrF0r8XnZAQDmXK3pBvQNRRxvOf5gH7GYhxvnXEv_fQpHAN6839nFf957cpr2QB_GcK357Dbg95bIdzYYhokk9ZynXKs98VARrCCsEUvAykah2Wd3UHy-XW8vV3ZzqfRBYLG-j2T70Jo0PwYMGRfuOgoIZT9qgH-YUB0rcY7DXmiLJFvfq_vmnMCCiH8o2piFE_d89ZvDUfqt-uSF4dgAIlOpQvuaFMaZ9sCZnPfm9f_MBqUwux4mf3rtyiBUBpEhtmFrC5VdZk8cTVmmyDzvsYFWlLtiDA-aZ29NrATzGLD-H62dac8NgHEUPbeUDbC0feeI6PJFo1V7p2ElWfQELsvmkbWvNCPH2IM59MYb4p6vSc7QUPH_d6ViajRVhwfUSu9yPXLzcGZ0nLXVCAIPCQu7HzMfUp6LzHuknIRKGzvYK4t35x8-ynhqaDW3wCNMEuNWZOmuprK5EnphSiygfJxJmz2-vD_M8vbx3ro2iNfOL1EOEe0583tWFAoT5Ijaa1LZuMw3_DohVCOxGlvJcieID8hRFi5nwguTpF_NMtcQvVtcuTK8vLB00EawzWKCRwpOn6DXmlUouRUDDOnNYXNFfpJmAGdiKFIsZe1JWJYgAGVFRGSVrIdlyOAVj-ORWqnPCfUkN9M7vXNXilpbP8eSe01LQs_TDtk-Wr3ciJ3YlbfsMLVikvN6UscDSkfa5_A38TAMZcpQtgstLN0IBXjnnw0y5uZ8yru-OMIAqabjY9sHChwU68oaGbTdSeACnMDMnespv3cmvw-rObuDD4S-2JZ52zg6vH9VmQD5Y5Fu_upA2KGPu_bnsgrGNAk92q-E9wgSOh3k6KNCbIA5Z3BeYobaZjByJPc1x0wXQYyyo6QTuuX6ZGvhaRlJCil8SoixXgm8YU4gvrfQpH-K1jvKzqCopbtygLbNyubNZWXjxOfD7E7RS1iSNGxJOtn-orVywKZmJBdw566ye02CPwwndzHv_kvYgOljUrCrECUedWydvOSEFcyEHAs9yG1v30L52mv-ki09yrLJIUSdohHhvQVEG2-bToYwEAyUI9vbJ16Jp9iC2nXDYNhbAOOWXgSiyl2H0uGtvKbX4_CT8mcpfFUWNDinHoTuCJkGL5gcYv3A1LxTJSRwIsAZGQkrYcZ5_A5e21bskxA455830Y0g7o7q9NbMw-i5Q0B1HZdbjh85QOJ19CJqYyxy3mbVUlS3rmcrSqkJ4SsujZeQxgUPxDwuWB157hET6kaba5urVuL&player.idxu=3ed8fe51-ad6e-41e5-8524-1fc4fd13a399&player.idxseg=X4KBfLev,mqZmzXw7,pSNoVd78,qOlIGjBO';
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
