import React, {useRef, useState} from 'react';
import MapView, {Region} from 'react-native-maps';
import HomeMapScreen from '~presentation/home/HomeMapScreen';
import {LocationPlayList} from '~recoil/LocationAtom';
import {useRecoilValue} from 'recoil';

const HomeMapScreenContainer = () => {
  const mapRef = useRef<MapView | null>(null);
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);
  const locationPlayList = useRecoilValue(LocationPlayList);
  // 모달창 상태관리
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // 마커 더미데이터
  const markers = [
    {latitude: 37.5013, longitude: 127.0397},
    {latitude: 37.5051, longitude: 127.0397},
    {latitude: 37.5017, longitude: 127.0397},
    {latitude: 37.5017, longitude: 127.0401},
    {latitude: 37.505, longitude: 127.0381},
    {latitude: 37.5013, longitude: 127.0397},
    {latitude: 37.6612, longitude: 127.2838},
    {latitude: 37.4928, longitude: 127.0289},
    {latitude: 37.2039, longitude: 127.0377},
    {latitude: 37.3838, longitude: 127.1397},
  ];

  const handleZoomIn = () => {
    if (currentRegion && mapRef.current) {
      // 만약 현재 지도 영역과 맵 참조가 존재한다면
      // 경도, 위도 범위를 줄여서 지도를 확대
      const newRegion: Region = {
        ...currentRegion,
        latitudeDelta: currentRegion.latitudeDelta / 2,
        longitudeDelta: currentRegion.longitudeDelta / 2,
      };
      // animateToRegion 함수를 사용하여 부드럽게 축소
      mapRef.current.animateToRegion(newRegion, 500);
    }
  };

  const handleZoomOut = () => {
    if (currentRegion && mapRef.current) {
      // 만약 현재 지도 영역과 맵 참조가 존재한다면
      // 경도, 위도 범위를 늘려서 지도를 축소
      const newRegion: Region = {
        ...currentRegion,
        latitudeDelta: currentRegion.latitudeDelta * 2,
        longitudeDelta: currentRegion.longitudeDelta * 2,
      };
      mapRef.current.animateToRegion(newRegion, 500);
    }
  };

  // 현재 위치로 이동하는 함수
  const moveToCurrentLocation = () => {
    if (currentRegion && mapRef.current) {
      // 현재 위치 정보를 사용하여 지도 영역을 설정
      // location.latitude, location.longitude로 하고 싶다...
      const newRegion: Region = {
        latitude: 37.5013,
        longitude: 127.0397,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      // animateToRegion 함수를 사용하여 현재 위치로 지도를 이동합니다.
      mapRef.current.animateToRegion(newRegion, 500);
    }
  };
  return (
    <HomeMapScreen
      mapRef={mapRef}
      markers={markers}
      currentRegion={currentRegion}
      setCurrentRegion={setCurrentRegion}
      handleZoomIn={handleZoomIn}
      handleZoomOut={handleZoomOut}
      moveToCurrentLocation={moveToCurrentLocation}
      locationPlayList={locationPlayList}
    />
  );
};

export default HomeMapScreenContainer;
