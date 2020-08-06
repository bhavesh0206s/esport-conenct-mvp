import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Home from '../../screens/home';
import Header from '../../shared/header';
import EventDetailsCard from '../../screens/EventHandling/eventDetailsCard';
import { Easing } from 'react-native';
import { animationConfig } from '../../shared/routeAnimationConfig';
import EventRegistration from '../../screens/EventHandling/eventRegistration';
import SearchedUserProfile from '../../screens/profileHandling/searchedUserProfile';

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
          headerTitle: () => <Header navigation={navigation} title="Home" />,
          drawerLockMode: 'locked-closed',
        })}
        component={Home}
      />
      <Stack.Screen
        name="EventDetailsCard"
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Header
              navigation={navigation}
              title="Event Details"
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
              title="Userprofile"
              type="Userprofile"
            />
          ),
          headerTitleContainerStyle: {
            left: 40,
          },
        })}
        component={SearchedUserProfile}
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
