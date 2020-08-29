import React from 'react';
import { createStackNavigator, CardStyleInterpolators  } from '@react-navigation/stack';
import Header from '../../../shared/header';
import { animationConfig } from '../../../shared/routeAnimationConfig';
import EventDetailsCard from '../../../screens/host/EventHandling/eventDetailsCard';
import Participants from '../../../screens/host/EventHandling/participants';

const Stack = createStackNavigator();

const EventDetailsTopNavStack = () => {
  return (
    <Stack.Navigator
       screenOptions={{
        transitionSpec:{
          open: animationConfig,
          close: animationConfig
        },
        
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
      headerMode='screen'
    >
      <Stack.Screen
        name="Event Details"
        options={({ navigation, route }) => ({
          headerTitle: () => <Header navigation={navigation} title="Event Details" />,
        })}
        component={EventDetailsCard}
      />
    </Stack.Navigator>
  );
};

export default EventDetailsTopNavStack;
