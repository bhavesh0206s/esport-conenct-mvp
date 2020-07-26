import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../../shared/header';
import MyEvent from '../../screens/EventHandling/myEvent';

const Stack = createStackNavigator();

const EventStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My Events"
        options={({ navigation, route }) => ({
          headerTitle: () => <Header navigation={navigation} title="My Events" />,
        })}
        component={MyEvent}
      />
    </Stack.Navigator>
  );
};

export default EventStack;
