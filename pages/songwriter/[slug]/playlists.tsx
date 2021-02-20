import { TabPane } from 'rc-tabs';

import MediaWidget from 'components/MediaWidgets';
import getMediaName from 'utils/getMediaName';
import { Songwriter } from 'types';

import { StyledTabs } from './styles';

type PlaylistsProps = {
  playlists: Songwriter['playlists'];
};

export default function Playlists({ playlists }: PlaylistsProps) {
  if (playlists.length === 1) {
    const media = getMediaName(playlists[0].mediaUrl);
    const Widget = MediaWidget.playlist[media];
    return <Widget playlist={playlists[0]} />;
  }

  return (
    <StyledTabs>
      {playlists.map((playlist) => {
        const media = getMediaName(playlist.mediaUrl);
        const Widget = MediaWidget.playlist[media];

        return (
          <TabPane tab={media} key={playlist.mediaUrl}>
            <Widget playlist={playlist} />
          </TabPane>
        );
      })}
    </StyledTabs>
  );
}
