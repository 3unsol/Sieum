import {NavigationContainer, PathConfigMap} from '@react-navigation/native';
import Navigation from '~nav/Navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Linking, StatusBar} from 'react-native';
import React from 'react';
import {RecoilRoot} from 'recoil';
import {PaperProvider} from 'react-native-paper';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const config: {screens: PathConfigMap<object>} = {
    screens: {
      OAuthCallbackHandler: 'oauth/callback',
    },
  };
  const linking = {
    prefixes: ['sieum://'],
    config,
    subscribe(listener: (url: string) => void) {
      const onReceiveURL = ({url}: {url: string}) => {
        console.log('url : ' + url);
        return listener(url);
      };

      Linking.addEventListener('url', onReceiveURL);
    },
  };
  return (
    <RecoilRoot>
      <PaperProvider>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <StatusBar hidden={true} />
            <NavigationContainer linking={linking}>
              <Navigation />
            </NavigationContainer>
          </QueryClientProvider>
        </SafeAreaProvider>
      </PaperProvider>
    </RecoilRoot>
  );
}

export default App;
