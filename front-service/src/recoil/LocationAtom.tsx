import {atom} from 'recoil';

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

interface LatLng {
  latitude: number;
  longitude: number;
}

export const LocationCodeAtom = atom<number>({
  key: 'locationCode',
  default: 0,
});

export const LocationNameAtom = atom<string>({
  key: 'locationName',
  default: '',
});

export const LocationPlayList = atom<MyLocationCurrentPlayingMusicList[]>({
  key: 'locationPlayList',
  default: [
    {
      uid: '',
      nickname: '',
      profileImg: '',
      musicUri: '',
      albumTitle: '',
      albumArtistName: '',
      albumImg: '',
      createdAt: 0,
      latitude: 0,
      longitude: 0,
    },
  ],
});

export const MyPositionAtom = atom<LatLng>({
  key: 'myPosition',
  default: {
    latitude: 0,
    longitude: 0,
  },
});
