import React from 'react';
import { createStackNavigator, CardStyleInterpolators, HeaderBackButton } from '@react-navigation/stack';
import Profile from '../../../screens/host/profileHandling/profile';
import Header from '../../../shared/header';
import EditProfile from '../../../screens/host/profileHandling/editProfile';
import EventDetails from '../../../screens/host/EventHandling/eventDetails';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        options={({ navigation, route }) => ({
          headerTitle: (props) => (
            <Header 
              {...props}
              navigation={navigation} 
              title='Profile'
            />),
        })}
        component={Profile}
      />
      <Stack.Screen
        name="EditProfile"
        options={({ navigation, route }) => ({
          headerTitle: () => <Header navigation={navigation} type='editProfile' title="Edit Profile" />,
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              tintColor='#4ecca3'
            />
          ),
          headerTitleContainerStyle: {
            left: 40,
          },
        })}
        component={EditProfile}
      />
      <Stack.Screen
        name="EventDetailsProfile"
        options={({ navigation, route }) => ({
          headerTitle: (props) => (
            <Header
              {...props}
              navigation={navigation}
              title={route.params.title}
              type="EventDetailsCard"
            />
          ),
          headerTitleContainerStyle: {
            left: 40,
          },
        })}
        component={EventDetails}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
