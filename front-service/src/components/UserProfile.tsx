import React from 'react';
import {View, StyleSheet, ImageSourcePropType, Dimensions} from 'react-native';
import {Avatar, Button, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil'; // Recoil에서 useRecoilValue import

import {myProfileInfoAtom} from '~recoil/MemberAtom'; // MyProfile Atom을 import

interface UserProfileProps {
  profileimage: ImageSourcePropType; // 프로필 이미지 소스 타입
  postNum: number; // 게시물 수
  friendNum: number; // 친구 수
  playlistNum: number; // 플레이리스트 수
}

const UserProfile: React.FC<UserProfileProps> = ({
  profileimage,
  postNum,
  friendNum,
  playlistNum,
}) => {
  const {width} = Dimensions.get('window');

  const navigation = useNavigation(); // navigation 객체 가져오기

  const goToEditProfile = () => {
    navigation.navigate('EditProfile'); // EditProfile 페이지로 이동
  };

  // Recoil에서 nickname 상태 가져오기
  const myProfile = useRecoilValue(myProfileInfoAtom);

  const nickname = myProfile.nickname;

  // console.log('프로필 이미지:', profileimage);
  return (
    <>
      <View style={styles.profileTop}>
        <View style={styles.imageArea}>
          <Avatar.Image
            size={width * 0.25}
            source={profileimage}
            style={styles.profileImage}
          />
        </View>

        <View style={styles.textArea}>
          <View style={styles.textContainer}>
            <View style={styles.textBox}>
              <Text variant="titleMedium" style={styles.profileTitleText}>
                Post
              </Text>
              <Text variant="titleMedium" style={styles.profileText}>
                {postNum}
              </Text>
            </View>

            <View style={styles.textBox}>
              <Text variant="titleMedium" style={styles.profileTitleText}>
                Friend
              </Text>
              <Text variant="titleMedium" style={styles.profileText}>
                {friendNum}
              </Text>
            </View>

            <View style={styles.textBox}>
              <Text variant="titleMedium" style={styles.profileTitleText}>
                Playlist
              </Text>
              <Text variant="titleMedium" style={styles.profileText}>
                {playlistNum}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.profileMiddle}>
        <Text variant="titleMedium" style={styles.nickname}>
          {nickname}
        </Text>
        <View style={styles.btnArea}>
          <Button
            mode="contained-tonal"
            buttonColor="#FCD34D"
            style={styles.btn}
            onPress={goToEditProfile}>
            <Text variant="titleMedium" style={styles.btnText}>
              프로필 수정
            </Text>
          </Button>
        </View>
      </View>
    </>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textArea: {
    width: width * 0.7,
  },
  textContainer: {
    flexDirection: 'row',
  },
  profileText: {
    textAlign: 'center',
  },
  profileTitleText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  textBox: {
    width: 60,
    marginHorizontal: 15,
  },
  imageArea: {
    alignContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileImage: {
    margin: 15,
  },
  nickname: {
    width: width * 0.25,
    textAlign: 'center',
    margin: 15,
    fontWeight: 'bold',
  },
  btnArea: {
    width: width * 0.7,
    alignItems: 'center',
  },
  btn: {
    width: width * 0.6,
    marginHorizontal: 15,
  },
  btnText: {
    color: 'white',
  },
  //////
  // container: {
  //   flexDirection: 'row', // 가로로 나열
  //   alignItems: 'center', // 수직 가운데 정렬
  // },
  // image: {
  //   width: 100,
  //   height: 100,
  //   marginRight: 10, // 이미지와 텍스트 사이 간격 설정
  // },
  // textContainer: {
  //   flex: 1, // 오른쪽 텍스트 컨테이너가 남은 공간을 모두 차지
  // },
  // row: {
  //   flexDirection: 'row', // 가로로 나열
  // },
  // column: {
  //   flex: 1, // 세로로 나뉘는 열에 공간을 균등하게 배분
  // },
  // textItem: {
  //   marginBottom: 10, // 각 텍스트 항목 사이 간격 설정 (더 큰 간격)
  // },
  // centeredText: {
  //   textAlign: 'center', // 텍스트 가운데 정렬
  // },
  // largeText: {
  //   fontSize: 20, // 글자 크기를 크게 조절 (원하는 크기로 수정)
  // },
});

export default UserProfile;
