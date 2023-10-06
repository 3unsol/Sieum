import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OAuthCallbackHandler from '~components/OAuthCallbackHandler';
import LoginWebView from '~presentation/login/LoginWebView';
import LoginContainer from '../container/login/LoginContainer';

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        presentation: 'modal',
        headerShown: false,
      }}>
      <NativeStack.Screen name="LoginContainer" component={LoginContainer} />
      <NativeStack.Screen
        name="OAuthCallbackHandler"
        component={OAuthCallbackHandler}
      />
      <NativeStack.Screen name="LoginWebView" component={LoginWebView} />
    </NativeStack.Navigator>
  );
};

export default Stack;
