import React from 'react';
import { createStackNavigator, CardStyleInterpolators, HeaderBackButton} from '@react-navigation/stack';
import Header from '../../../shared/header';
import MyEvent from '../../../screens/player/EventHandling/myEvent';
import { animationConfig } from '../../../shared/routeAnimationConfig';
import SearchedProfile from '../../../screens/player/profileHandling/searchedProfile';
import MyEventTeamDetails from '../../../screens/player/EventHandling/myEventTeamDetails';

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
        component={MyEventTeamDetails}
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
        component={SearchedProfile}
      />
    </Stack.Navigator>
  );
};

export default EventStack;
