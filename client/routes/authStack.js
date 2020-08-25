import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/auth/login';
import UserName from '../screens/auth/userName';
import GoogleUsername from '../screens/auth/googleUsername';
import LoginType from '../screens/auth/loginType';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >  
        <Stack.Screen name="LoginType" component={LoginType} />
        <Stack.Screen name="AuthHost" component={Login} />
        <Stack.Screen name="AuthPlayer" component={Login} />
        <Stack.Screen name="UserName" component={UserName} />
        <Stack.Screen name="GoogleUsername" component={GoogleUsername} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
