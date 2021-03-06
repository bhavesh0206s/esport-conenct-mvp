import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileStack from './otherStack/profileStack';
import HomeStack from './otherStack/homeStack';
import UploadPostModal from '../../screens/host/postHandling/uploadPost';

const Tab = createBottomTabNavigator();

const UploadPostComponent = () => null;

export default function TabStack() {
  
  const showTabIcons = (route, focused, color, size) => {
    if (route.name === 'Home') {
      return (
        <AntDesign name="home" size={30} color={focused ? '#4ecca3' : 'gray'} />
      );
    } else if (route.name === 'Search') {
      return (
        <FontAwesome
          name="search"
          size={30}
          color={focused ? '#4ecca3' : 'gray'}
        />
      );
    } else if (route.name === 'Profile') {
      return (
        <MaterialCommunityIcons
          name="face-profile"
          size={30}
          color={focused ? '#4ecca3' : 'gray'}
        />
      );
    } else if (route.name === 'Event') {
      return (
        <MaterialIcons
          name="event"
          size={30}
          color={focused ? '#4ecca3' : 'gray'}
        />
      )
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) =>
          showTabIcons(route, focused, color, size),
      })}
      tabBarOptions={{
        activeTintColor: '#4ecca3',
        inactiveTintColor: 'gray',
        showLabel: false,
        style: {
          backgroundColor: '#232931'
        }
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen 
        name="Upload" 
        options={({ navigation, route }) => ({
          tabBarIcon: () => (<UploadPostModal navigation={navigation} />),
        })}
        component={UploadPostComponent} 
      />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}
