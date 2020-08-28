import React from 'react';
import { createStackNavigator, CardStyleInterpolators  } from '@react-navigation/stack';
import Header from '../../../shared/header';
import MyEvent from '../../../screens/player/EventHandling/myEvent';
import MyEventDetails from '../../../screens/player/EventHandling/myEventDetails';
import { animationConfig } from '../../../shared/routeAnimationConfig';
import SearchedProfile from '../../../screens/player/profileHandling/searchedProfile';

const Stack = createStackNavigator();

const EventStack = () => {
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
        name="My Events"
        options={({ navigation, route }) => ({
          headerTitle: () => <Header navigation={navigation} title="My Events" />,
        })}
        component={MyEvent}
      />
      <Stack.Screen
        name="My Event Details"
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Header 
              navigation={navigation} 
              type='myEventDetails' 
              title={route.params.title}
            />
          ),
          headerTitleContainerStyle: {
            left: 40,
          },
        })}
        component={MyEventDetails}
      />
      <Stack.Screen
        name="Userprofile"
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Header
              navigation={navigation}
              title='Team Member Profile'
              type="userProfile"
            />
          ),
          headerTitleContainerStyle: {
            left: 40,
          },
        })}
        component={SearchedProfile}
      />
    </Stack.Navigator>
  );
};

export default EventStack;