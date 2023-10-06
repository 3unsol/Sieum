import React from 'react';
import ClusteredMapView from 'react-native-map-clustering';
import {Dimensions, View, StyleSheet} from 'react-native';
import {Marker} from 'react-native-maps';
import Styled from 'styled-components/native';

interface props {
  postLocation: any;
  locationData: any;
  mapRef: any;
  marker: any;
}

const mapWidth = Dimensions.get('window').width;
let mapHeight = Dimensions.get('window').height;

const SetMyLocation = (props: props) => {
  return (
    <View style={styles.container}>
      <ClusteredMapView
        clusterColor="#FCD34D"
        ref={props.mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 37.5013,
          longitude: 127.0397,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {
          <Marker
            coordinate={{
              latitude: props.marker.latitude,
              longitude: props.marker.longitude,
            }}
            onPress={() => props.postLocation()}>
            <MarkerView>
              {props.locationData ? (
                <LocationText>{props.locationData.address_name}</LocationText>
              ) : (
                <LocationText>현재위치 확인중</LocationText>
              )}
            </MarkerView>
          </Marker>
        }
      </ClusteredMapView>
    </View>
  );
};
const MarkerView = Styled.View`
  padding: 12px;
  border: 2px solid #dddddd;
  border-radius: 10px;
  background-color: white;
`;

const LocationText = Styled.Text`
  font-size: 14px;
`;

const styles = StyleSheet.create({
  // 지도 관련 스타일
  container: {
    flex: 1,
  },
  map: {
    // flex:1로 바꾸면 터짐
    width: mapWidth,
    height: mapHeight,
  },
});

export default SetMyLocation;
