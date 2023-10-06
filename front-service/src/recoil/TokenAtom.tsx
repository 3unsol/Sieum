import {atom} from 'recoil';

export const AccessTokenAtom = atom<string>({
  key: 'accessToken',
  default: '',
});

export const RefreshTokenAtom = atom<string>({
  key: 'refreshToken',
  default: '',
});

export const SpotifyTokenAtom = atom<string>({
  key: 'spotifyToken',
  default: '',
});
