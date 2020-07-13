import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../../screens/profileHandling/profile';
import Header from '../../shared/header';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        options={({ navigation, route }) => ({
          headerTitle: () => <Header navigation={navigation} title="Profile" />,
        })}
        component={Profile}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
