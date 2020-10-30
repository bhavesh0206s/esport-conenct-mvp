import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoadingScreen from '../screens/loadingScreen';

const Stack = createStackNavigator();

const MyTheme = {
  dark: false,
  colors: {
    primary: '#232931',
    background: '#232931',
    card: '#232931',
    text: '#eeeeee',
    border: '#232931',
    notification: '#232931',
  },
};

const LoadingStack = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >  
        <Stack.Screen name="Loading" component={LoadingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoadingStack;
