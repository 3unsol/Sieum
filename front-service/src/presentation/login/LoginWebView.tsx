import React from 'react';
import {WebView} from 'react-native-webview';
import Config from 'react-native-config';

const LoginWebView = () => {
  return (
    <WebView
      source={{
        uri: `${Config.API_BASE_URL}/oauth2/login`,
      }}
      javaScriptEnabled={true}
      userAgent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
    />
  );
};

export default LoginWebView;
