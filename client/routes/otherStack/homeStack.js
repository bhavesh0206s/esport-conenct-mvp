import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/home';
import Header from '../../shared/header';
import EventDetailsCard from '../../screens/EventHandling/eventDetailsCard';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
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
              title="EventDetailsCard"
              type="EventDetailsCard"
            />
          ),
        })}
        component={EventDetailsCard}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
