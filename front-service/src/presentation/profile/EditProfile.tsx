import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Chip,
  Dialog,
  IconButton,
  Modal,
  PaperProvider,
  Portal,
  Searchbar,
  Snackbar,
  Text,
  TextInput,
} from 'react-native-paper';
import TextTicker from 'react-native-text-ticker';
import {
  searchItemByArtist,
  searchItemByTrack,
  getAccessToken,
  getProfiileImage,
} from '~apis/spotifyApi';
import BackTopbar from '~components/BackTopBar';
import {useRecoilValue} from 'recoil'; // Recoil에서 useRecoilValue import

import {myProfileInfoAtom} from '~recoil/MemberAtom'; // MyProfile Atom을 import

interface SpotifyUserResponse {
  display_name?: string;
  external_urls?: {
    spotify?: string;
  };
  followers?: {
    href?: string;
    total?: number;
  };
  href?: string;
  id?: string;
  images?: {
    url?: string;
    height?: number;
    width?: number;
  }[];
  type?: string;
  uri?: string;
}

const EditProfile: React.FC = () => {
  const myProfile = useRecoilValue(myProfileInfoAtom);

  const nickname = myProfile.nickname;

  const spotifyId = myProfile.spotifyId;

  const [profileImageUrl, setProfileImageUrl] = useState('');

  const [visible, setVisible] = useState(false);
  const [modalNum, setModalNum] = useState(0);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const [visibleDialog, setVisibleDialog] = React.useState(false);
  const showDialog = () => setVisibleDialog(true);
  const hideDialog = () => setVisibleDialog(false);

  useEffect(() => {
    async function getData() {
      const profile: SpotifyUserResponse = await getProfiileImage(spotifyId);
      if (profile.images && profile.images.length > 0) {
        setProfileImageUrl(profile.images[0].url);
      }
    }
    getData();
  }, []);

  // eslint-disable-next-line react/no-unstable-nested-components
  const DialogComponent = () => {
    const styles = StyleSheet.create({
      dialogText: {
        textAlign: 'center',
      },
    });

    return (
      <Portal>
        <Dialog visible={visibleDialog} onDismiss={hideDialog}>
          <Dialog.Content>
            <Text variant="headlineMedium" style={styles.dialogText}>
              수정이 완료되었습니다
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={hideDialog}
              buttonColor="#FCD34D"
              textColor="white"
              mode="text">
              닫기
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  };

  const favoriteGenre = [
    {
      genre: 'acuostic',
    },
    {
      genre: 'death metal',
    },
    {
      genre: 'hard rock',
    },
    {
      genre: 'k-pop',
    },
    {
      genre: 'j-pop',
    },
  ];

  const AllGenre = [
    {
      id: 1,
      genre: 'acuostic',
      selected: true,
    },
    {
      id: 2,
      genre: 'death metal',
      selected: true,
    },
    {
      id: 3,
      genre: 'hard rock',
      selected: true,
    },
    {
      id: 4,
      genre: 'k-pop',
      selected: true,
    },
    {
      id: 5,
      genre: 'j-pop',
      selected: false,
    },
    {
      id: 6,
      genre: 'alternative pop',
      selected: false,
    },
    {
      id: 7,
      genre: 'anime',
      selected: false,
    },
    {
      id: 8,
      genre: 'british',
      selected: false,
    },
    {
      id: 9,
      genre: 'bossa nova',
      selected: false,
    },
    {
      id: 10,
      genre: 'chill-out',
      selected: false,
    },
    {
      id: 11,
      genre: 'christmas',
      selected: false,
    },
    {
      id: 12,
      genre: 'classic',
      selected: false,
    },
    {
      id: 13,
      genre: 'country',
      selected: false,
    },
    {
      id: 14,
      genre: 'dance pop',
      selected: false,
    },
    {
      id: 15,
      genre: 'disco',
      selected: false,
    },
    {
      id: 16,
      genre: 'doo-wop',
      selected: false,
    },
    {
      id: 17,
      genre: 'drama',
      selected: false,
    },
    {
      id: 18,
      genre: 'drill and bass',
      selected: false,
    },
    {
      id: 19,
      genre: 'dubstep',
      selected: false,
    },
  ];

  // eslint-disable-next-line react/no-unstable-nested-components
  const ModalComponent = () => {
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

    // const [nickname, setNickname] = useState("원래닉네임");
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = (query: string) => setSearchQuery(query);
    const [chipData, setChipData] = useState(AllGenre);
    const [count, setCount] = useState(0);
    const [searchData, setSearchData] = useState<SpotifySearchResponse | null>(
      null,
    );

    const [snackbarVisible, setSnackBarVisible] = useState(false);
    const onToggleSnackBar = () => setSnackBarVisible(true);
    const onDismissSnackBar = () => setSnackBarVisible(false);

    useEffect(() => {
      console.log(searchData);
    }, [count, searchData]);

    const handleChipClick = chipId => {
      const updatedData = [...chipData];

      updatedData.forEach(item => {
        if (item.id === chipId) {
          if (item.selected === true) {
            setCount(count - 1);
            item.selected = !item.selected;
            setChipData(updatedData);
          } else {
            if (count >= 5) {
              onToggleSnackBar();
            } else {
              setCount(count + 1);
              item.selected = !item.selected;
              setChipData(updatedData);
            }
          }
        }
      });
    };

    const countUp = () => {
      let selectedCount = 0;
      AllGenre.forEach(item => {
        if (item.selected === true) {
          selectedCount += 1;
        }
      });
      setCount(selectedCount);
    };

    const styles = StyleSheet.create({
      modal: {
        height: Dimensions.get('window').height * 0.7,
      },
      header: {
        // marginVertical: 10,
        marginBottom: 20,
      },
      rowBox: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      textInput: {
        backgroundColor: 'white',
        flex: 1,
      },
      iconBtn: {
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#FCD34D',
      },
      searchBar: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#FCD34D',
        marginBottom: 10,
      },
      searchItemBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        alignContent: 'center',
      },
      searchItemCover: {
        width: 60,
        height: 60,
      },
      searchItemText: {
        marginHorizontal: 10,
      },
      addBtnBox: {
        marginLeft: 'auto',
      },
      addBtn: {
        backgroundColor: '#FCD34D',
      },
      emptyText: {
        textAlign: 'center',
        marginTop: 30,
      },
      chipContainer: {
        marginVertical: 5,
        marginRight: 5,
      },
      chip: {
        alignContent: 'space-between',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#FCD34D',
        alignSelf: 'center',
      },
      selectedChip: {
        alignContent: 'space-between',
        backgroundColor: '#FCD34D',
        borderWidth: 2,
        borderColor: '#FCD34D',
        alignSelf: 'center',
      },
      chipBox: {
        maxHeight: Dimensions.get('window').height * 0.7,
      },
      genreBox: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
      },
      checkBtn: {
        // backgroundColor: "red",
        // justifyContent: "flex-end",
        // marginLeft: "auto",
        // alignSelf: "flex-start",
      },
      snackbarContainer: {
        flex: 1,
        justifyContent: 'space-between',
      },
      snackbar: {
        backgroundColor: '#FCD34D',
      },
    });

    if (modalNum === 3) {
      // 프로필 뮤직 변경 모달
      return (
        <KeyboardAvoidingView style={styles.modal} behavior="height">
          <Text variant="headlineMedium" style={styles.header}>
            프로필 뮤직 수정
          </Text>
          <Searchbar
            placeholder="음악을 검색하세요"
            rippleColor="#FCD34D"
            style={styles.searchBar}
            // placeholderTextColor="white"
            iconColor="#FCD34D"
            onChangeText={onChangeSearch}
            value={searchQuery}
            onIconPress={async () => {
              const newData: SpotifySearchResponse = await searchItemByTrack(
                searchQuery,
              );
              setSearchData(newData);
              Keyboard.dismiss();
            }}
            onSubmitEditing={async () => {
              const newData: SpotifySearchResponse = await searchItemByTrack(
                searchQuery,
              );
              setSearchData(newData);
            }}
          />
          {searchData !== null ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={searchData.tracks?.items || []}
              keyExtractor={item => item.id || ''}
              renderItem={({item}) => (
                <>
                  <View style={styles.searchItemBox}>
                    <Card.Cover
                      source={{uri: item.album?.images[0].url}}
                      style={styles.searchItemCover}
                    />
                    <View style={styles.searchItemText}>
                      <Text variant="titleMedium">{item.name}</Text>
                      <Text variant="titleSmall">{item.artists[0].name}</Text>
                    </View>
                    <View style={styles.addBtnBox}>
                      <IconButton
                        style={styles.addBtn}
                        icon={'plus'}
                        iconColor="white"
                        onPress={() => {}}
                      />
                    </View>
                  </View>
                </>
              )}
            />
          ) : (
            <Text variant="bodyLarge" style={styles.emptyText}>
              검색 내용이 없습니다😅
            </Text>
          )}
        </KeyboardAvoidingView>
      );
    } else if (modalNum === 4) {
      // 선호 장르 변경 모달
      useEffect(() => {
        if (visible) {
          countUp();
        }
      }, []);
      return (
        <>
          <Text variant="headlineMedium" style={styles.header}>
            선호 장르 수정
          </Text>
          <View style={styles.chipBox}>
            <Text variant="bodyMedium">*최대 5개 선택 가능</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              numColumns={3}
              data={AllGenre}
              renderItem={({item}) => (
                <View style={styles.chipContainer}>
                  {item.selected === false ? (
                    <Chip
                      key={item.id}
                      style={styles.chip}
                      onPress={() => handleChipClick(item.id)}>
                      {item.genre}
                    </Chip>
                  ) : (
                    <Chip
                      key={item.id}
                      style={styles.selectedChip}
                      textStyle={{color: 'white'}}
                      onPress={() => handleChipClick(item.id)}>
                      {item.genre}
                    </Chip>
                  )}
                </View>
              )}
            />
          </View>
          <View style={styles.genreBox}>
            <IconButton
              style={styles.checkBtn}
              icon={'check'}
              size={30}
              iconColor="#FCD34D"
              onPress={() => {
                // TODO : 선호 장르 수정 api 호출
                hideModal();
                showDialog();
              }}
            />
          </View>
          <View style={styles.snackbarContainer}>
            <Snackbar
              duration={Snackbar.DURATION_SHORT}
              style={styles.snackbar}
              visible={snackbarVisible}
              onDismiss={onDismissSnackBar}
              iconAccessibilityLabel={'Close icon'}
              action={{
                label: '닫기',
                textColor: 'black',
                onPress: () => {
                  // Do something
                },
              }}>
              <Text variant="bodyMedium">다섯개까지만 선택이 가능합니다 !</Text>
            </Snackbar>
          </View>
        </>
      );
    }
  };

  return (
    <PaperProvider>
      <View style={styles.mainBg}>
        <BackTopbar title={'프로필 수정'} />
        <DialogComponent />
        <View style={styles.profile}>
          <Avatar.Image size={150} source={{uri: profileImageUrl}} />

          <Text style={styles.textInput}>{nickname}</Text>
          <TouchableOpacity
            style={styles.profileMusic}
            onPress={() => {
              setModalNum(3);
              showModal();
            }}>
            <Card.Cover
              source={require('src/static/images/cover.png')}
              style={styles.cardCover}
            />
            <View style={styles.textBox}>
              <TextTicker
                duration={5000}
                loop
                // bounce
                repeatSpacer={50}
                marqueeDelay={400}>
                <Text variant="bodyLarge">
                  최대한 길게 작성해보겠습니다 어떻게 될까요 ?
                </Text>
              </TextTicker>
              <Text variant="bodyMedium">우효</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.genreBox}>
            <Text variant="titleLarge" style={styles.genre}>
              나의 선호 장르
            </Text>
            <IconButton
              icon={'pencil-outline'}
              onPress={() => {
                setModalNum(4);
                showModal();
              }}
            />
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={favoriteGenre}
            renderItem={({item}) => (
              <View style={styles.chipContainer}>
                <Chip style={styles.chip} textStyle={{color: 'white'}}>
                  {item.genre}
                </Chip>
              </View>
            )}
          />
        </View>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <ModalComponent />
          </Modal>
        </Portal>
      </View>
    </PaperProvider>
  );
};

export default EditProfile;

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  mainBg: {
    flex: 1,
    backgroundColor: 'white',
  },
  icon: {
    alignSelf: 'center',
  },
  profile: {
    alignItems: 'center',
    marginVertical: 40,
  },
  textInput: {
    backgroundColor: 'white',
    width: 'auto',
    height: 30,
    textAlign: 'center',
    marginVertical: 40,
  },
  profileMusic: {
    overflow: 'hidden',
    width: width * 0.7,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  cardCover: {
    width: 50,
    height: 50,
  },
  textBox: {
    marginLeft: 10,
    marginRight: 15,
    alignSelf: 'center',
  },
  chipContainer: {
    margin: 5,
  },
  chip: {
    alignContent: 'space-between',
    backgroundColor: '#FCD34D',
    alignSelf: 'center',
  },
  genreBox: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  genre: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
