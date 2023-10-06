import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FriendList from '../presentation/friendList/FriendList';
import Community from '../presentation/community/Community';
import Home from '../presentation/home/Home';
import PlayList from '../presentation/playList/PlayList';
import MyProfile from '../presentation/profile/MyProfile';
import HomeContainer from '~container/home/HomeContainer';

const Tab = createBottomTabNavigator();

const NaigationTabBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="history"
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        headerShown: false,

        tabBarStyle: {
          borderRadius: 10,
          backgroundColor: 'white',
        },

        tabBarActiveTintColor: '#FDE68A',
        tabBarInactiveTintColor: '#71717A',

        tabBarItemStyle: {
          bottom: 25,
          height: 100,
          padding: 15,
        },

        tabBarIcon: ({focused, color}) => {
          let iconName: string = '';
          let rn = route.name;

          if (rn === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === 'Community') {
            iconName = focused ? 'earth' : 'earth-outline';
          } else if (rn === 'PlayList') {
            iconName = focused ? 'folder-open' : 'folder-open-outline';
          } else if (rn === 'FriendList') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (rn === 'MyProfile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={35} color={color} />;
        },
      })}>
      <Tab.Screen name="FriendList" component={FriendList} />
      <Tab.Screen name="Community" component={Community} />
      <Tab.Screen name="Home" component={HomeContainer} />
      <Tab.Screen name="PlayList" component={PlayList} />
      <Tab.Screen name="MyProfile" component={MyProfile} />
    </Tab.Navigator>
  );
};
export default NaigationTabBar;
