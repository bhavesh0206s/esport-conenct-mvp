import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import About from '../../screens/about';
import Header from '../../shared/header';

const Stack = createStackNavigator()

const AboutStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='About'
        options={({ navigation, route }) => ({
          headerTitle: () => <Header navigation={navigation} title='About'/>,
        })}
        component={About}
      />
    </Stack.Navigator>
  );
}
 
export default AboutStack;