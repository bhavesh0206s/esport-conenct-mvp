import React from 'react';
import { createStackNavigator, CardStyleInterpolators  } from '@react-navigation/stack';
import Header from '../../../shared/header';
import { animationConfig } from '../../../shared/routeAnimationConfig';
import EventDetailsCard from '../../../screens/host/EventHandling/eventDetailsCard';
import Participants from '../../../screens/host/EventHandling/participants';

const Stack = createStackNavigator();

const ParticipantsTopNavStack = () => {
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
        name="Participants"
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Header 
              navigation={navigation}  
              title='Particapants'
            />
          ),
          headerTitleContainerStyle: {
            left: 40,
          },
        })}
        component={Participants}
      />
    </Stack.Navigator>
  );
};

export default ParticipantsTopNavStack;
