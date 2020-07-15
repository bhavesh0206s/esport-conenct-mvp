import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/auth/login';
import TabStack from './tabStack';
import Header from '../shared/header';
import ConfirmEvent from '../screens/postHandling/confirmEvent';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        options={{headerShown: false}}
        component={TabStack} />
      <Stack.Screen
        name='Confirm Event'
        options={({ navigation, route }) => ({
          headerTitle: () => <Header navigation={navigation} type='confirmEvent' title='Confirm Event'/>,
        })}
      component={ConfirmEvent}
    />
    </Stack.Navigator>
  );
};

export default MainStack;
