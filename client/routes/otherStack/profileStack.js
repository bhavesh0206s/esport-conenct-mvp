import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Profile from '../../screens/profileHandling/profile';
import Header from '../../shared/header';
import EventDetailsCard from '../../screens/EventHandling/eventDetailsCard';
import { animationConfig } from '../../shared/routeAnimationConfig';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        transitionSpec:{
          open: animationConfig,
          close: animationConfig
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
      headerMode='screen'
    >
      <Stack.Screen
        name="Profile"
        options={({ navigation, route }) => ({
          headerTitle: () => <Header navigation={navigation} title="Profile" />,
        })}
        component={Profile}
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
        })}
        component={EventDetailsCard}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
