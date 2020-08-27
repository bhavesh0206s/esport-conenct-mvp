import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import About from '../../../screens/player/about';
import Header from '../../../shared/header';
import Notification from '../../../screens/player/notifcationHandling/notification';

const Stack = createStackNavigator()

const NotificationStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='About'
        options={({ navigation, route }) => ({
          headerTitle: () => <Header navigation={navigation} title='Notification'/>,
        })}
        component={Notification}
      />
    </Stack.Navigator>
  );
}
 
export default NotificationStack;