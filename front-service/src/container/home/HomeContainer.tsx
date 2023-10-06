import {useLayoutEffect, useState} from 'react';
import Home from '~presentation/home/Home';
import {CurrentMusicColRef} from '~components/GetRef';
import {getDocs, query} from 'firebase/firestore';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {LocationCodeAtom, LocationPlayList} from '~recoil/LocationAtom';

// interface MyLocationCurrentPlayingMusicList {
//   uid: string;
//   nickname: string;
//   profileImg: string;
//   musicUri: string;
//   albumTitle: string;
//   albumArtistName: string;
//   albumImg: string;
//   createdAt: number;
// }

const HomeContainer = () => {
  const [musicMode, setMusicMode] = useState<boolean>(true);
  const locationCode = useRecoilValue(LocationCodeAtom);

  const setLocationPlayList = useSetRecoilState(LocationPlayList);
  const toggleMode = () => {
    setMusicMode(!musicMode);
  };
  useLayoutEffect(() => {
    if (locationCode) {
      getLocationPlaylist();
    }
  }, [locationCode]);
  const getLocationPlaylist = async () => {
    const currentMusicListRef = CurrentMusicColRef(locationCode.toString());
    const q = query(currentMusicListRef);
    const querySnapshot = await getDocs(q);
    setLocationPlayList(
      querySnapshot.docs.map(doc => ({
        uid: doc.data().uid,
        nickname: doc.data().nickname,
        profileImg: doc.data().profileImg,
        musicUri: doc.data().musicUri,
        albumTitle: doc.data().albumTitle,
        albumArtistName: doc.data().albumArtistName,
        albumImg: doc.data().albumImg,
        createdAt: doc.data().createdAt,
        latitude: doc.data().latitude,
        longitude: doc.data().longitude,
      })),
    );
  };

  return <Home toggleMode={toggleMode} musicMode={musicMode} />;
  // return locationPlayList ? (
  //   <Home toggleMode={toggleMode} musicMode={musicMode} />
  // ) : (
  //   <div>TEST</div>
  // );
};

export default HomeContainer;
