import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  GestureResponderEvent,
} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import TextTicker from 'react-native-text-ticker';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {LocationNameAtom} from '~recoil/LocationAtom';
import styled from 'styled-components/native';

interface Props {
  toggleMode: () => void;
}

const HomeTopBar: React.FC<Props> = props => {
  const locationName = useRecoilValue(LocationNameAtom);
  return (
    <View style={styles.topbar} id="myComponent">
      <View style={styles.tb_left}>
        <Image source={require('~images/Logo.png')} style={styles.logo} />
      </View>
      <View style={styles.tb_center}>
        <Text
          variant="titleMedium"
          style={[styles.centeredText, styles.address]}>
          내 위치
        </Text>
        <TextTicker
          duration={5000}
          loop
          bounce
          repeatSpacer={40}
          marqueeDelay={100}>
          <Text
            variant="titleMedium"
            style={[styles.centeredText, styles.address]}>
            {locationName}
          </Text>
        </TextTicker>
      </View>
      <MapButton onPress={props.toggleMode}>
        <MapButtonIcon source={require('~icons/map-icon.png')} />
      </MapButton>
    </View>
  );
};

let mapHeight = Dimensions.get('window').height;

const MapButton = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-end;
`;

const MapButtonIcon = styled.Image`
  width: 50px;
  height: 50px;
`;

const styles = StyleSheet.create({
  centeredText: {
    textAlign: 'center',
  },
  logo: {
    width: 50,
    height: 20,
    resizeMode: 'contain',
  },

  topbar: {
    height: mapHeight * 0.1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 5,
    // paddingHorizontal: 20, // 양쪽 여백 임시
  },
  tb_left: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  tb_center: {
    flex: 2,
    alignItems: 'center',
  },
  tb_right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  address: {
    fontWeight: 'bold',
  },
});

export default HomeTopBar;
