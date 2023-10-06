import {setDoc} from 'firebase/firestore';

interface MusicObject {
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

const UpdateCurrentMusic = (
  currentMusicDocRef: any,
  myProfileData: any,
  musicData: any,
  myPosition: LatLng,
) => {
  console.log('UpdateCurrentMusic currentMusicDocRef : ', currentMusicDocRef);
  const finalObject: MusicObject = {
    uid: myProfileData.spotifyId,
    nickname: myProfileData.nickname,
    profileImg: myProfileData.profileImageUrl,
    musicUri: musicData.track.uri,
    albumTitle: musicData.track.name,
    albumArtistName: musicData.track.artist.name,
    albumImg: musicData.albumImg,
    createdAt: Date.now(),
    latitude: myPosition.latitude,
    longitude: myPosition.longitude,
  };
  setDoc(currentMusicDocRef, finalObject);
};

export default UpdateCurrentMusic;
