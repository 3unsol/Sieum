import HomeMusicScreen from '~presentation/home/HomeMusicScreen';
import React from 'react';
import {LocationPlayList} from '~recoil/LocationAtom';
import {useRecoilValue} from 'recoil';

const HomeMusicScreenContainer = () => {

  const locationPlayList = useRecoilValue(LocationPlayList);
  return <HomeMusicScreen locationPlayList={locationPlayList} />;

};

export default HomeMusicScreenContainer;