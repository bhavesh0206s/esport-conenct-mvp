import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Home from '../../../screens/player/home';
import Header from '../../../shared/header';
import EventDetailsCard from '../../../screens/player/EventHandling/eventDetailsCard';
import { Easing } from 'react-native';
import { animationConfig } from '../../../shared/routeAnimationConfig';
import EventRegistration from '../../../screens/player/EventHandling/eventRegistration';
import SearchedProfile from '../../../screens/player/profileHandling/searchedProfile';
import SearchStack from './searchStack';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        transitionSpec: {
          open: animationConfig,
          close: animationConfig,
        },

        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      headerMode="screen"
    >
      <Stack.Screen
        name="Home"
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Header navigation={navigation} type="home" title="EBind" />
          ),
          drawerLockMode: 'locked-closed',
        })}
        component={Home}
      />
      <Stack.Screen
        name="Search"
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Header navigation={navigation} title="Search" type="Search" />
          ),
          headerTitleContainerStyle: {
            left: 40,
          },
        })}
        component={SearchStack}
      />
      <Stack.Screen
        name="EventDetailsCard"
        options={({ navigation, route }) => ({
          headerTitle: (props) => (
            <Header
              {...props}
              navigation={navigation}
              title={route.params.title}
              type="EventDetailsCard"
            />
          ),
          headerTitleContainerStyle: {
            left: 40,
          },
        })}
        component={EventDetailsCard}
      />
      <Stack.Screen
        name="Register"
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Header navigation={navigation} title="Register" type="register" />
          ),
          headerTitleContainerStyle: {
            left: 40,
          },
        })}
        component={EventRegistration}
      />
      <Stack.Screen
        name="Userprofile"
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Header
              navigation={navigation}
              title={route.params?.HostProfileTitle ?? 'Host Profile'}
              type="userProfile"
            />
          ),
          headerTitleContainerStyle: {
            left: 40,
          },
        })}
        component={SearchedProfile}
      />
      <Stack.Screen
        name="EventDetailsProfile"
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Header
              navigation={navigation}
              title="Hosted Event Details "
              type="EventDetailsCard"
            />
          ),
          headerTitleContainerStyle: {
            left: 40,
          },
        })}
        component={EventDetailsCard}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
