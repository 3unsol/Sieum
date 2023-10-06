import SetMyLocation from '~presentation/location/SetMyLocation';
import {PermissionsAndroid, Platform, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import Config from 'react-native-config';
import {
  LocationNameAtom,
  LocationCodeAtom,
  MyPositionAtom,
} from '~recoil/LocationAtom';
import {myProfileInfoAtom} from '~recoil/MemberAtom';
import {useSetRecoilState} from 'recoil';
import {getMyProfile} from '~apis/memberApi';

const SetMyLocationContainer = ({navigation}: any) => {
  const mapRef = useRef<MapView | null>(null);
  const [latLng, setLatLng] = useState({
    latitude: 37.5013,
    longitude: 127.0397,
  });
  const [locationData, setLocationData] = useState<any>();
  const setLocationCodeAtom = useSetRecoilState(LocationCodeAtom);
  const setLocationNameAtom = useSetRecoilState(LocationNameAtom);
  const setMyLatLng = useSetRecoilState(MyPositionAtom);
  const setMyProfileInfoAtom = useSetRecoilState(myProfileInfoAtom);
  // Geolocation을 통해 위도, 경도 반환
  useEffect(() => {
    requestMyLatLng();
    getMyProfile().then(res => {
      console.log('res.data:', res.data);
      setMyProfileInfoAtom(res.data);
    });
  }, []);

  useEffect(() => {
    if (latLng.latitude !== 37.5013 && latLng.longitude !== 127.0397) {
      getLocationInfoByLatLng();
    }
  }, [latLng]);
  const requestMyLatLng = () => {
    try {
      // 안드로이드 위치 정보 수집 권한 요청
      if (Platform.OS === 'android') {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then(permissionStatus => {
          if (permissionStatus === 'granted') {
            Geolocation.getCurrentPosition(
              geoPosition => {
                const {latitude, longitude} = geoPosition.coords;
                setLatLng({latitude: latitude, longitude: longitude});
                setMyLatLng({latitude: latitude, longitude: longitude});
              },
              error => {
                console.log(error);
              },
              {
                enableHighAccuracy: false,
                timeout: 50000,
              },
            );
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getLocationInfoByLatLng = () => {
    axios
      .get(
        `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${latLng.longitude}&y=${latLng.latitude}`,
        {
          headers: {
            Host: 'dapi.kakao.com',
            Authorization: `KakaoAK ${Config.KAKAO_MAP_API_KEY}`,
          },
        },
      )
      .then(res => {
        console.log('res.data.documents[1] : ', res.data.documents[1]);
        setLocationData(res.data.documents[1]);
      });
  };

  const postLocation = async () => {
    Alert.alert('My Zone 설정', '현재 위치로 MYZONE을 설정하시겠습니까?', [
      {
        text: 'Cancel',
        onPress: () => {
          Alert.alert(
            'My Zone 설정 안함',
            '위치를 설정하지 않을 경우 일부 기능에 제한이 있습니다. 정말로 취소하시겠습니까?',
            [
              {
                text: 'Cancel',
              },

              {
                text: 'OK',
                onPress: async () => {
                  navigation.replace('NavigationTabBar', {screen: 'Home'});
                },
              },
            ],
          );
        },
      },

      {
        text: 'OK',
        onPress: async () => {
          if (locationData) {
            setLocationCodeAtom(locationData.code / 1);
            setLocationNameAtom(locationData.address_name);
            navigation.replace('NavigationTabBar', {screen: 'Home'});
          }
        },
      },
    ]);
  };

  return (
    <SetMyLocation
      mapRef={mapRef}
      marker={latLng}
      locationData={locationData}
      postLocation={postLocation}
    />
  );
};

export default SetMyLocationContainer;
