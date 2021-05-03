import { PlaylistWidgetFactory, SongWidgetFactory } from './Factory';

const ADDON_ATTRS = {
  youtube: {
    allow:
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
    allowFullScreen: true,
  },
  spotify: {
    allow: 'encrypted-media',
    allowtransparency: true,
  },
  bandcamp: {
    seamless: true,
    height: '42px',
  },
};

export default {
  song: {
    youtube: SongWidgetFactory({
      getUrl: (id: string) => `https://www.youtube.com/embed/${id}`,
      pattern: /((v=)|(be\/))(?<id>.+)$/,
      addonAttrs: ADDON_ATTRS['youtube'],
    }),
    spotify: SongWidgetFactory({
      getUrl: (id: string) => `https://open.spotify.com/embed/track/${id}`,
      pattern: /track\/(?<id>[^?]+)/,
      addonAttrs: ADDON_ATTRS['spotify'],
    }),
    bandcamp: SongWidgetFactory({
      getUrl: (id: string) =>
        `https://bandcamp.com/EmbeddedPlayer/size=small/bgcol=333333/linkcol=ffffff/track=${id}/transparent=true/`,
      pattern: /\?id=(?<id>.+)$/,
      addonAttrs: ADDON_ATTRS['bandcamp'],
    }),
  },
  playlist: {
    youtube: PlaylistWidgetFactory({
      getUrl: (id: string) =>
        `https://www.youtube.com/embed/videoseries?list=${id}`,
      pattern: /(list=)(?<id>.+)$/,
      addonAttrs: ADDON_ATTRS['youtube'],
    }),
    spotify: PlaylistWidgetFactory({
      getUrl: (id: string) => `https://open.spotify.com/embed/playlist/${id}`,
      pattern: /playlist\/(?<id>[^?]+)/,
      addonAttrs: ADDON_ATTRS['spotify'],
    }),
  },
};
