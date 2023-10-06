import {atom} from 'recoil';

interface MyProfile {
  spotifyId: string;
  nickname: string;
  profileImageUrl?: string;
  profileMusicUri?: string;
  albumArtist?: string;
  albumImageUrl?: string;
  albumTitle?: string;
  hashtags?: string[];
  myLikedMusicList: {
    id: number;
    musicUri: string;
    albumImageUrl: string;
    albumArtist: string;
    albumTitle: string;
    createdTime: Date;
    isDeleted: boolean;
  };
}

export const myProfileInfoAtom = atom<MyProfile>({
  key: 'myProfile',
  default: {
    spotifyId: '',
    nickname: '',
    profileImageUrl: '',
    profileMusicUri: '',
    albumArtist: '',
    albumImageUrl: '',
    albumTitle: '',
    hashtags: [],
    myLikedMusicList: {
      id: 0,
      musicUri: '',
      albumImageUrl: '',
      albumArtist: '',
      albumTitle: '',
      createdTime: new Date(),
      isDeleted: false,
    },
  },
});
