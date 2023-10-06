import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

const Login = ({onPress}: any) => {
  return (
    <LinearGradient
      start={{x: 1, y: 1}}
      end={{x: 1, y: 0}}
      colors={['#FFFBEB', '#FBBF24']}
      style={styles.container}>
      <MascotImg source={require('~images/mascot2-removebg.png')} />
      <LoginButton onPress={onPress}>
        <LoginButtonIcon source={require('~icons/spotify-icon.png')} />
        <LoginButtonText>스포티파이 로그인</LoginButtonText>
      </LoginButton>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const MascotImg = styled.Image`
  width: 400px;
  height: 400px;
`;

const LoginButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #1ed760;
  border-radius: 10px;
  width: ${Dimensions.get('window').width - 150}px;
`;

const LoginButtonIcon = styled.Image`
  width: 50px;
  height: 50px;
`;

const LoginButtonText = styled.Text`
  line-height: 30px;
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

export default Login;
