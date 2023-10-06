import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Text, Appbar, Divider, Card, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getAllPlaylists, getMyPlaylists} from '~apis/spotifyApi';
import {useRecoilValue} from 'recoil'; // Recoil에서 useRecoilValue import

import {myProfileInfoAtom} from '~recoil/MemberAtom'; // MyProfile Atom을 import

const Topbar = ({title}) => {
  const topbarStyle = StyleSheet.create({
    topbar: {
      alignItems: 'center',
      textAlign: 'center',
    },
    title: {
      flex: 1,
      alignItems: 'center',
      textAlign: 'center',
    },
  });

  return (
    <>
      <Appbar.Header style={topbarStyle.topbar}>
        <Appbar.Content title={title} style={topbarStyle.title} />
      </Appbar.Header>
      <Divider />
    </>
  );
};

const ListBox = ({subTitle, type}) => {
  interface myPlaylistResponse {
    href?: string;
    limit?: number;
    next?: string | null;
    offset?: number;
    previous?: string | null;
    total?: number;
    items?: {
      collaborative?: boolean;
      description?: string;
      external_urls?: {
        spotify?: string;
      };
      href?: string;
      id?: string;
      images?: {
        url?: string;
        height?: number;
        width?: number;
      }[];
      name?: string;
      owner?: {
        external_urls?: {
          spotify?: string;
        };
        followers?: {
          href?: string;
          total?: number;
        };
        href?: string;
        id?: string;
        type?: string;
        uri?: string;
        display_name?: string;
      };
      public?: boolean;
      snapshot_id?: string;
      tracks?: {
        href?: string;
        total?: number;
      };
      type?: string;
      uri?: string;
    }[];
  }

  const [like, setLike] = useState(true);
  const [myPlaylist, setMyPlaylist] = useState<myPlaylistResponse | null>(null);
  const [allPlaylist, setallPlaylist] = useState<myPlaylistResponse | null>(
    null,
  );

  const myProfile = useRecoilValue(myProfileInfoAtom);
  const spotifyId = myProfile.spotifyId;

  useEffect(() => {
    async function getData() {
      if (type === 'my') {
        const newMyPlaylist: myPlaylistResponse = await getMyPlaylists(
          spotifyId,
        );
        setMyPlaylist(newMyPlaylist);
      } else {
        const newAllPlaylist: myPlaylistResponse = await getAllPlaylists();
        setallPlaylist(newAllPlaylist);
      }
    }
    getData();
  }, []);

  const ListBoxStyle = StyleSheet.create({
    listBox: {
      // flex: 1,
      margin: 10,
    },
    box: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      margin: 5,
    },
    category: {
      fontWeight: 'bold',
      margin: 15,
    },
    cover: {
      width: 60,
      height: 60,
    },
    listText: {
      marginTop: 5,
      marginLeft: 10,
    },
    likeBtn: {
      marginLeft: 'auto',
    },
  });

  const navigation = useNavigation();

  return (
    <View style={ListBoxStyle.listBox}>
      <Text variant="titleMedium" style={ListBoxStyle.category}>
        {subTitle}
      </Text>
      <FlatList
        data={
          type === 'my' ? myPlaylist?.items || [] : allPlaylist?.items || []
        }
        keyExtractor={item => item.name || ''}
        renderItem={({item}) => (
          <View style={ListBoxStyle.box}>
            <TouchableOpacity
              style={ListBoxStyle.box}
              onPress={() => {
                navigation.navigate('PlaylistDetail', {
                  playlistId: item.id,
                  playlistTitle: item.name,
                });
              }}>
              <Card.Cover
                source={{uri: item.images[0].url}}
                style={ListBoxStyle.cover}
              />
              <View>
                <Text variant="titleMedium" style={ListBoxStyle.listText}>
                  {item.name}
                </Text>
                <Text variant="titleSmall" style={ListBoxStyle.listText}>
                  총 {item.tracks?.total}곡 |{' '}
                  {<Icon name="heart" size={15} color="#FCD34D" />}
                  {item.owner?.followers?.total} 개
                </Text>
              </View>
            </TouchableOpacity>
            <View style={ListBoxStyle.likeBtn}>
              {like ? ( // 좋아요 여부에 따라 하트색 변경 -> 나의 플레이스트라면 좋아요 해제 하는 순간 화면에서 사라지게 하면 될듯
                <IconButton
                  icon="cards-heart"
                  iconColor="#FCD34D"
                  size={30}
                  onPress={() => {
                    setLike(false); // TODO : 개별적으로 만들어서 연결
                  }}
                />
              ) : (
                <IconButton
                  icon="cards-heart-outline"
                  iconColor="#FCD34D"
                  size={30}
                  onPress={() => {
                    setLike(true);
                  }}
                />
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const Playlist = () => {
  const myProfile = useRecoilValue(myProfileInfoAtom);

  const nickname = myProfile.nickname;

  const mainStyle = StyleSheet.create({
    background: {
      // flex: 1,
      backgroundColor: 'white',
    },
  });

  return (
    <View style={mainStyle.background}>
      <Topbar title={'플레이리스트'} />
      <ListBox subTitle={`${nickname}님의 플레이리스트`} type={'my'} />
      <Divider />
      <ListBox
        subTitle={`${nickname}님이 좋아요 한 플레이리스트`}
        type={'all'}
      />
    </View>
  );
};

export default Playlist;
