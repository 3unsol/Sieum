import {Dimensions, FlatList, Keyboard, KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {Card, IconButton, Modal, Portal, Searchbar, Text} from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import HorizontalFlatList from '~components/HorizontalFlatList';
import TwolineFlatList from '~components/TwolineFlatList';
import { getRecommend, searchItemByTrack } from '~apis/spotifyApi';
import MusicFlatList from '~components/MusicFlatList';

interface MyLocationCurrentPlayingMusicList {
  uid: string;
  nickname: string;
  profileImg: string;
  musicUri: string;
  albumTitle: string;
  albumArtistName: string;
  albumImg: string;
  createdAt: number;
  latitude: number;
  longitude: number;
}

interface Props {
  locationPlayList: MyLocationCurrentPlayingMusicList[];
}

const HomeMusicScreen: React.FC<Props> = props => {

  // eslint-disable-next-line react/no-unstable-nested-components
  const ModalComponent = () => {

    const styles = StyleSheet.create({
      modal: {
          height: Dimensions.get("window").height * 0.7,
      },
      header: {
          marginBottom: 20,
      },
      iconBtn: {
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
          backgroundColor: "#FCD34D",
      },
      searchBar: {
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "#FCD34D",
          marginBottom: 10,
      },
      searchItemBox: {
          flex:1 ,
          flexDirection: "row",
          alignItems: "center",
          margin: 10,
          alignContent: "center",
      },
      searchItemCover: {
          width: 60,
          height: 60,
      },
      searchItemText: {
          marginHorizontal: 10,
      },
      addBtnBox: {
          marginLeft: "auto",
      },
      addBtn: {
          backgroundColor: "#FCD34D",
      },
      emptyText: {
          textAlign: "center",
          marginTop: 30,
      },
  });
  
    interface SpotifySearchResponse {
      tracks?: {
      href?: string;
      items?: {
          album?: {
          album_type?: string;
          artists?: {
              external_urls?: {
              spotify?: string;
              };
              href?: string;
              id?: string;
              name?: string;
              type?: string;
              uri?: string;
          }[];
          external_urls?: {
              spotify?: string;
          };
          href?: string;
          id?: string;
          images?: {
              height?: number;
              url?: string;
              width?: number;
          }[];
          is_playable?: boolean;
          name?: string;
          release_date?: string;
          release_date_precision?: string;
          total_tracks?: number;
          type?: string;
          uri?: string;
          };
          artists?: {
          external_urls?: {
              spotify?: string;
          };
          href?: string;
          id?: string;
          name?: string;
          type?: string;
          uri?: string;
          }[];
          disc_number?: number;
          duration_ms?: number;
          explicit?: boolean;
          external_ids?: {
          isrc?: string;
          };
          external_urls?: {
          spotify?: string;
          };
          href?: string;
          id?: string;
          is_local?: boolean;
          is_playable?: boolean;
          name?: string;
          popularity?: number;
          preview_url?: string | null;
          track_number?: number;
          type?: string;
          uri?: string;
      }[];
      };
      limit?: number;
      next?: string | null;
      offset?: number;
      previous?: string | null;
      total?: number;
  }
  
  const [searchQuery, setSearchQuery] = useState("");
    const onChangeSearch = (query : string) => setSearchQuery(query);
    const [searchData, setSearchData] = useState<SpotifySearchResponse | null>(null);
  
    return (
      <KeyboardAvoidingView
          style={styles.modal}
          behavior="height"
      >
          <Text variant="headlineMedium" style={styles.header}>음악 검색</Text>
          <Searchbar
                  placeholder="음악을 검색하세요"
                  rippleColor="#FCD34D"
                  style={styles.searchBar}
                  iconColor="#FCD34D"
                  onChangeText={onChangeSearch}
                  value={searchQuery}
                  onIconPress={async () => {
                      const newData :SpotifySearchResponse =  await searchItemByTrack(searchQuery);
                      setSearchData(newData);
                      Keyboard.dismiss();
                  }}
                  onSubmitEditing={async () => {
                      const newData :SpotifySearchResponse =  await searchItemByTrack(searchQuery);
                      setSearchData(newData);
                  }}
          />
          {searchData !== null ? (
              <FlatList
                  showsVerticalScrollIndicator={false}
                  data={searchData.tracks?.items || []}
                  keyExtractor={(item) => item.id || ''}
                  renderItem={({item}) => (
                      <>
                          <View style={styles.searchItemBox}>
                              <Card.Cover
                                  source={{uri: item.album?.images[0].url }}
                                  style={styles.searchItemCover}
                              />
                              <View style={styles.searchItemText}>
                                  <Text variant="titleMedium">{item.name}</Text>
                                  <Text variant="titleSmall">{item.artists[0].name}</Text>
                              </View>
                              <View style={styles.addBtnBox}>
                                  <IconButton
                                      style={styles.addBtn}
                                      icon={"plus"}
                                      iconColor="white"
                                      onPress={async () => {
                                        setSelectedMusic(item.id);
                                        hideModal();
                                      }}
                                  />
                              </View>
                          </View>
                      </>
                  )}
              />
          ) : (
              <Text variant="bodyLarge" style={styles.emptyText}>검색 내용이 없습니다😅</Text>
          )}
      </KeyboardAvoidingView>
  );
  };

  const styles = StyleSheet.create({
    reBtn: {
      flex: 1,
      justifyContent:"flex-end",
    },
    horizontal: {
      flex: 1,
      flexDirection: "row",
      alignContent: "center",
      alignItems: "center",
    },
    plusBtn: {
      // justifyContent: "center",
      // alignItems: "center",
      // alignSelf: "center",
    },
    content: {
      // flex: 1,
      // justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      // alignItems: "center",
    },
    selectBox: {
      alignSelf: "center",
      width: Dimensions.get("window").width * 0.9,
      height: 150,
      backgroundColor: "#FCD34D",
    },
    listTitle: {
      margin: 10,
      fontWeight: 'bold',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: 2, height: 2},
      textShadowRadius: 10,
    },
  });

  const [visible, setVisible] = useState(false);
  const [recommendMusics, setRecommendMusics] = useState<any | null>(null);
  const [selectedMusic, setSelectedMusic] = useState<any>("");

  useEffect(() => {
    async function getData() {
      const newData = await getRecommend(selectedMusic);
      setRecommendMusics(newData);
    }
    getData();
  },[selectedMusic]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <View>
      <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
              <ModalComponent />
          </Modal>
      </Portal>
      <View>
        { recommendMusics === null ?
        <Card style={styles.selectBox}>
          <Card.Content style={styles.content}>
            <Text variant="titleLarge">비슷한 곡을 찾고 싶다면 ?</Text>
            <IconButton
                style={styles.plusBtn}
                icon="plus"
                iconColor="white"
                size={60}
                onPress={() => {
                  showModal();
                }}
              />
          </Card.Content>
        </Card>
        :
        <>
          <View style={styles.horizontal}>
            <Text variant="headlineLarge" style={[styles.listTitle,styles.reBtn]}>추천곡</Text>
            <IconButton
                style={styles.plusBtn}
                icon="autorenew"
                iconColor="#FCD34D"
                size={30}
                onPress={() => {
                  setSelectedMusic(null);
                  setRecommendMusics(null);
                }}
            />
          </View>
          <MusicFlatList props={recommendMusics} />
        </>
        }
      </View>
      <Text variant="headlineLarge" style={styles.listTitle}>
        최신 음악
      </Text>
      <TwolineFlatList />

      <Text variant="headlineLarge" style={styles.listTitle}>
        내 근처 인기 음악
      </Text>
      <HorizontalFlatList locationPlayList={props.locationPlayList} />


    </View>
  );
};

export default HomeMusicScreen;
