import axios from 'axios';
import RNSecureStorage from 'rn-secure-storage';
import Config from 'react-native-config';

// local vue api axios instance

function RestApiInstance() {
  const instance = axios.create({
    baseURL: `${Config.API_BASE_URL}/api`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  instance.interceptors.request.use(async config => {
    if (!config.headers) return config;
    const accessToken = await RNSecureStorage.get('accessToken');
    config.headers.Authorization = accessToken;
    return config;
  });

  return instance;
}

export {RestApiInstance};
