import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Event from '../../screens/EventHandling/event';
import Header from '../../shared/header';

const Stack = createStackNavigator();

const EventStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Event"
        options={({ navigation, route }) => ({
          headerTitle: () => <Header navigation={navigation} title="Event" />,
        })}
        component={Event}
      />
    </Stack.Navigator>
  );
};

export default EventStack;
