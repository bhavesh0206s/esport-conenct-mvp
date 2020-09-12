import React from 'react';
import { createStackNavigator, CardStyleInterpolators, HeaderBackButton } from '@react-navigation/stack';
import Search from '../../../screens/player/search';
import Header from '../../../shared/header';
import EventDetailsCard from '../../../screens/player/EventHandling/eventDetailsCard';
import { animationConfig } from '../../../shared/routeAnimationConfig';

const Stack = createStackNavigator();

const SearchStack = () => {
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
        name="Search"
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Header navigation={navigation} title="Search" type="Search" />
          ),
        })}
        component={Search}
      />
      <Stack.Screen
        name="EventDetailsCard"
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Header
              navigation={navigation}
              title={route.params.title}
              type="EventDetailsCard"
            />
          ),
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              tintColor='#4ecca3'
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

export default SearchStack;
