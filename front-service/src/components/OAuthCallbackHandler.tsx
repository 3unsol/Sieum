import {useEffect, useState} from 'react';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import {useSetRecoilState} from 'recoil';
import {
  AccessTokenAtom,
  RefreshTokenAtom,
  SpotifyTokenAtom,
} from '~recoil/TokenAtom';
import Config from 'react-native-config';
import {auth as SpotifyAuth, ApiScope} from 'react-native-spotify-remote';
import styled from 'styled-components/native';
import {ActivityIndicator} from 'react-native';

const SPOTIFY_CLIENT_ID = Config.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = Config.SPOTIFY_CLIENT_SECRET;
const BASE_URL = Config.API_BASE_URL;

const OAuthCallbackHandler = ({route}: any) => {
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');
  const setAccessTokenAtom = useSetRecoilState(AccessTokenAtom);
  const setRefreshTokenAtom = useSetRecoilState(RefreshTokenAtom);
  const setSpotifyTokenAtom = useSetRecoilState(SpotifyTokenAtom);

  const spotifyConfig = {
    clientID: `${SPOTIFY_CLIENT_ID}`,
    clientSecret: `${SPOTIFY_CLIENT_SECRET}`,
    redirectURL: `${BASE_URL}/spotify/oauth/callback`,
    tokenRefreshURL: `${BASE_URL}/spotify/oauth/callback`,
    tokenSwapURL: `${BASE_URL}/spotify/oauth/callback`,
    scopes: [ApiScope.AppRemoteControlScope, ApiScope.UserFollowReadScope],
  };

  // 1)Spotify Remote를 위한 Spotity Authentication 수행
  useEffect(() => {
    getSpotifyToken().then(() => {
      setAccessToken(route.params.accessToken);
      setRefreshToken(route.params.refreshToken);
    });
  }, []);

  // 2)추출한 access/refreshToken을 SecureStore 및 Atom 전역 state에 저장
  useEffect(() => {
    if (accessToken && refreshToken) {
      saveTokenToSecureStore('accessToken', accessToken).then(() => {
        setAccessTokenAtom(accessToken);
      });
      saveTokenToSecureStore('refreshToken', refreshToken).then(() => {
        setRefreshTokenAtom(refreshToken);
      });
    }
  }, [accessToken, refreshToken]);

  const saveTokenToSecureStore = async (type: string, token: string) => {
    await RNSecureStorage.set(type, token, {
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
    });
  };
  const getSpotifyToken = async () => {
    await SpotifyAuth.authorize(spotifyConfig)
      .then(res => {
        console.log('Spotify Authentication Success!', res);
        setSpotifyTokenAtom(res.accessToken);
        saveTokenToSecureStore('spotifyToken', res.accessToken);
      })
      .catch(err => console.log('Spotify Authentication Failed!!', err));
  };
  return (
    <Loader>
      <ActivityIndicator />
    </Loader>
  );
};

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default OAuthCallbackHandler;
