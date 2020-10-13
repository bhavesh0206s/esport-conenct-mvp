import React from 'react';
import { createStackNavigator, CardStyleInterpolators  } from '@react-navigation/stack';
import Header from '../../../shared/header';
import { animationConfig } from '../../../shared/routeAnimationConfig';
import EventDetails from '../../../screens/host/EventHandling/eventDetails';

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
        component={EventDetails}
      />
    </Stack.Navigator>
  );
};

export default EventDetailsTopNavStack;
