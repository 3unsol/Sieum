import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  // 지도 관련 스타일
  container: {
    position: 'relative', // 부모 컨테이너에 대해 상대적인 위치
  },
  cover: {
    top: 4.5,
    left: 10,
    width: 15,
    height: 15,
    borderRadius: 20,
    position: 'absolute', // 절대 위치
    zIndex: 1, // zIndex 값을 작게 해서 뒤로
  },
  marker: {
    width: 35,
    height: 40,
    resizeMode: 'contain',
    position: 'absolute', // 절대 위치
    zIndex: 2, // zIndex 값을 크게 해서 앞으로
  },
});

const CustomMarker = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('~images/yellowMarker.png')} // 마커 이미지
        style={styles.marker}
      />
      <Image source={require('~images/cover2.png')} style={styles.cover} />
    </View>
  );
};

export default CustomMarker;
