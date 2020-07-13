import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../../screens/search';
import Header from '../../shared/header';

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="Search"
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Header navigation={navigation} title="Search" type="Search" />
          ),
        })}
        component={Search}
      />
      {/* <Stack.Screen
        name="Userprofile"
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Header
              navigation={navigation}
              title="Userprofile"
              type="Userprofile"
            />
          ),
        })}
        component={SearchedUserProfile}
      /> */}
    </Stack.Navigator>
  );
};

export default SearchStack;
