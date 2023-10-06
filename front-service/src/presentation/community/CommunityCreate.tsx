import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Keyboard,
  ScrollView,
} from 'react-native';
import {
  Card,
  Button,
  IconButton,
  Text,
  Modal,
  Searchbar,
} from 'react-native-paper';
import TextTicker from 'react-native-text-ticker';
import BackTopbar from '~components/BackTopBar';
import {searchItemByTrack} from '~apis/spotifyApi';

interface ModalComponentProps {
  hideModal: () => void;
  setSelectedMusic: (music: {
    name: string;
    artist: string;
    coverImage: string;
  }) => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  hideModal,
  setSelectedMusic,
}) => {
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

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query: string) => setSearchQuery(query);

  const [searchData, setSearchData] = useState<SpotifySearchResponse | null>(
    null,
  );

  return (
    <KeyboardAvoidingView style={styles.modal} behavior="height">
      <Text variant="headlineMedium" style={styles.header}>
        게시글 음악 선택
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
                    onPress={() => {
                      setSelectedMusic({
                        name: item.name || '',
                        artist: item.artists[0].name,
                        coverImage: item.album?.images[0].url || '',
                      });
                      hideModal(); // 모달 닫기
                    }}
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
};

const CreateComponent = () => {
  const [text, setText] = useState(''); // 텍스트 값을 저장할 state
  const [visible, setVisible] = useState(false);

  const [selectedMusic, setSelectedMusic] = useState({
    name: '', // 음악 이름
    artist: '', // 아티스트 이름
    coverImage: '', // 커버 이미지 URL
  });

  // 텍스트가 변경될 때마다 호출되는 함수
  const onChangeText = (newText: string) => {
    setText(newText);
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <>
      <Card mode="contained" style={styles.card}>
        <View style={styles.userProfileContainer}>
          <Image
            source={require('src/static/images/profileimage.png')}
            style={styles.userProfileImage}
          />
          <Text variant="bodyLarge" style={styles.username}>
            유저 이름
          </Text>
        </View>

        {selectedMusic.name ? (
          <View>
            {/* <TextTicker
              duration={5000}
              loop
              // bounce
              repeatSpacer={50}
              marqueeDelay={400}
              style={styles.textCenter}>
              <Text>{selectedMusic.name}</Text>
            </TextTicker>
            <TextTicker
              duration={5000}
              loop
              // bounce
              repeatSpacer={50}
              marqueeDelay={400}
              style={styles.textCenter}>
              <Text>{selectedMusic.artist}</Text>
            </TextTicker> */}
            <View style={styles.container}>
              {/* <Text style={styles.textCenter}>
                {selectedMusic.artist + ' - ' + selectedMusic.name}
              </Text> */}
              <TextTicker
                duration={5000}
                loop
                // bounce
                repeatSpacer={50}
                marqueeDelay={300}
                style={styles.textCenter}>
                <Text>{selectedMusic.name}</Text>
              </TextTicker>
              <TextTicker
                duration={5000}
                loop
                // bounce
                repeatSpacer={50}
                marqueeDelay={400}
                style={styles.textCenter}>
                <Text>{selectedMusic.artist}</Text>
              </TextTicker>
            </View>

            {selectedMusic.coverImage && (
              <Card.Cover
                source={{uri: selectedMusic.coverImage}}
                style={styles.cover}
              />
            )}
            <Button
              mode="contained" // mode 수정
              buttonColor="#FCD34D"
              style={styles.modifybtn}
              onPress={() => {
                showModal();
              }}>
              수정
            </Button>
          </View>
        ) : (
          <Card.Content style={[styles.cover, styles.contentWithMainBorder]}>
            <View style={styles.buttonContainer}>
              <View style={styles.centeredContainer}>
                <IconButton
                  icon="plus"
                  size={80}
                  onPress={() => {
                    showModal();
                  }}
                />
                <Text style={styles.text}>음악 선택하기</Text>
              </View>
            </View>
          </Card.Content>
        )}

        <Card.Content style={[styles.content, styles.contentWithBorder]}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="내용을 입력하세요" // 입력란에 힌트 텍스트
              onChangeText={onChangeText} // 텍스트가 변경될 때 호출되는 함수
              value={text} // 입력된 텍스트를 state로부터 가져옴
            />
          </View>
        </Card.Content>

        <Card.Content style={styles.content}>
          <Button
            mode="contained" // mode 수정
            buttonColor="#FCD34D"
            style={styles.btn}
            onPress={() => {
              // 게시글 등록 기능 로직
            }}>
            <Text variant="titleMedium" style={styles.btnText}>
              게시글 등록
            </Text>
          </Button>
        </Card.Content>
      </Card>

      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <ModalComponent
          hideModal={hideModal}
          setSelectedMusic={setSelectedMusic}
        />
      </Modal>
    </>
  );
};

const CommunityCreate: React.FC = () => {
  return (
    <ScrollView horizontal={false}>
      <View style={styles.mainBg}>
        <BackTopbar title={'게시글 생성'} />
        <CreateComponent />
      </View>
    </ScrollView>
  );
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
  card: {
    alignSelf: 'center',
    width: Dimensions.get('window').width,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 0,
  },
  cover: {
    alignSelf: 'center',
    borderRadius: 0,
    width: Dimensions.get('window').width * 0.95,
    height: Dimensions.get('window').width * 0.95,
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  content: {
    margin: 5,
  },
  contentWithMainBorder: {
    borderWidth: 1, // 경계선 두께 조절
    borderColor: 'gray', // 경계선 색상 조절
    borderStyle: 'solid', // 경계선 스타일 조절
    padding: 90, // 컨텐츠 주위에 여백 추가
  },
  contentWithBorder: {
    borderWidth: 1, // 경계선 두께 조절
    borderColor: 'gray', // 경계선 색상 조절
    borderStyle: 'solid', // 경계선 스타일 조절
    padding: 10, // 컨텐츠 주위에 여백 추가
  },
  centeredContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    left: Dimensions.get('window').width * 0.25,
  },
  userProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  userProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  container: {
    padding: 16,
    alignItems: 'center',
  },
  inputContainer: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginVertical: 5,
  },
  textCenter: {
    marginHorizontal: 15,
    marginVertical: 5,
    fontSize: 20,
    textAlign: 'center',
  },

  btn: {
    marginHorizontal: 15,
  },
  btnText: {
    color: 'white',
  },
  modifybtn: {
    marginVertical: 5,
    marginHorizontal: 140,
    height: 42,
    color: 'white',
  },
  mainBg: {
    backgroundColor: 'white',
  },
});

export default CommunityCreate;
