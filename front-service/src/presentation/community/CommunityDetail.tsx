import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {Card, IconButton, Text} from 'react-native-paper';
import BackTopbar from '~components/BackTopBar';
import {useRoute} from '@react-navigation/native';

interface PostItem {
  id: string;
  username: string;
  userProfileImage: number; // 이미지 파일 경로로 수정
  postImage: number; // 이미지 파일 경로로 수정
  caption: string;
  like: string;
  reply: string;
}

const postData: PostItem[] = [
  {
    id: '1',
    username: 'user1',
    userProfileImage: require('src/static/images/profileimage.png'),
    postImage: require('src/static/images/cover.png'),
    caption:
      '게시글 내용 1dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
    like: '232',
    reply: '10',
  },
  {
    id: '2',
    username: 'user2',
    userProfileImage: require('src/static/images/profileimage.png'),
    postImage: require('src/static/images/cover2.png'),
    caption: '게시글 내용 2',
    like: '14',
    reply: '0',
  },
  {
    id: '3',
    username: 'user3',
    userProfileImage: require('src/static/images/profileimage.png'),
    postImage: require('src/static/images/cover.png'),
    caption: '게시글 내용 3',
    like: '16',
    reply: '0',
  },
];

const PostComponent = ({item}: {item: PostItem}) => {
  const styles = StyleSheet.create({
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
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').width,
      aspectRatio: 1,
      resizeMode: 'cover',
    },
    content: {
      margin: 5,
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
    postImage: {
      width: '100%',
      height: 300,
      resizeMode: 'cover',
      marginBottom: 8,
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    actionButton: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 8,
      backgroundColor: '#FCD34D',
      borderRadius: 4,
      marginHorizontal: 4,
    },
    actionButtonText: {
      color: 'white',
    },

    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      marginVertical: 5,
    },
  });

  return (
    <>
      <Card mode="contained" style={styles.card}>
        <View style={styles.userProfileContainer}>
          <Image
            source={item.userProfileImage}
            style={styles.userProfileImage}
          />
          <Text variant="bodyLarge" style={styles.username}>
            {item.username}
          </Text>
        </View>

        <Card.Cover style={styles.cover} source={item.postImage} />
        <View style={styles.buttonContainer}>
          <IconButton
            icon="cards-heart-outline"
            iconColor="#FCD34D"
            size={30}
            onPress={() => {
              // 좋아요 기능
            }}
          />
          <IconButton
            icon="comment-outline"
            iconColor="#FCD34D"
            size={30}
            onPress={() => {
              // 댓글창 열기
            }}
          />
        </View>
        <Card.Content style={styles.content}>
          <Text variant="bodyMedium" style={styles.text}>
            좋아요 x개
          </Text>
          <Text variant="bodyMedium" style={styles.text}>
            {item.caption}
          </Text>
          <Text variant="bodyLarge" style={styles.text}>
            댓글 x개 보기
          </Text>
          <Text variant="bodyMedium" style={styles.text}>
            몇시간 전
          </Text>
        </Card.Content>
      </Card>
    </>
  );
};

const CommunityDetail: React.FC = () => {
  const route = useRoute();
  const {postId} = route.params;

  // postId에 해당하는 게시물 찾기
  const selectedPost = postData.find(post => post.id === postId);

  return (
    <View style={styles.mainBg}>
      <BackTopbar title={'게시글 상세'} />
      <View>{selectedPost && <PostComponent item={selectedPost} />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBg: {
    backgroundColor: 'white',
  },
});

export default CommunityDetail;
