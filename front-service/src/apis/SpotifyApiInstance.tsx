import axios from 'axios';
import RNSecureStorage from 'rn-secure-storage';

// local vue api axios instance

function SpotifyApiInstance() {
  const instance = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  instance.interceptors.request.use(async config => {
    if (!config.headers) return config;
    const spotifyToken = await RNSecureStorage.get('spotifyToken');
    config.headers.Authorization = `Bearer ${spotifyToken}`;
    return config;
  });

  return instance;
}

export {SpotifyApiInstance};
