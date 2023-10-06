import React from 'react';
import {StyleSheet, ScrollView, FlatList} from 'react-native';
import SpotifyRemoteTabBar from '~components/SpotifyRemoteTabBar';
import HomeTopBar from '~presentation/home/HomeTopBar';
import HomeMapScreenContainer from '~container/home/HomeMapScreenContainer';
import HomeMusicScreenContainer from '~container/home/HomeMusicScreenContainer';
import { Text } from 'react-native-paper';

interface MyLocationCurrentPlayingMusicList {
  uid: string;
  nickname: string;
  profileImg: string;
  musicUri: string;
  albumTitle: string;
  albumArtistName: string;
  albumImg: string;
  createdAt: number;
}

interface Props {
  toggleMode: () => void;
  musicMode: boolean;
}

const Home: React.FC<Props> = props => {
  return (
    <>
      <FlatList
      data={"1"}
      style={styles.mainBg}
      renderItem={({item}) => (
        <>
          <HomeTopBar toggleMode={props.toggleMode} />
          {props.musicMode ? (
          <HomeMusicScreenContainer />
        ) : (
          <HomeMapScreenContainer />
        )}
        </>
      )}
      />
      <SpotifyRemoteTabBar />
    </>
  );
};

const styles = StyleSheet.create({
  // 음악 관련 스타일
  mainBg: {
    backgroundColor: 'white',
  },
});

export default Home;
