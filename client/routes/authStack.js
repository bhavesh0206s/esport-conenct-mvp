import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/auth/login';
import UserName from '../screens/auth/userName';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Auth" component={Login} />
        <Stack.Screen name="UserName" component={UserName} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
