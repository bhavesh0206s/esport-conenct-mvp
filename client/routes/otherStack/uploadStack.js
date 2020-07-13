import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/home';
import Header from '../../shared/header';
import UploadPost from '../../screens/postHandling/uploadPost';

const Stack = createStackNavigator()

const UploadStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Upload'
        options={({ navigation, route }) => ({
          headerTitle: () => <Header navigation={navigation} title='Share Post'/>,
        })}
        component={UploadPost}
      />
    </Stack.Navigator>
  );
}
 
export default UploadStack;