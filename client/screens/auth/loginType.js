import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { signInAsync } from '../../Redux/actions/googleAuth';
import { SocialIcon, Button, Text } from 'react-native-elements';
import { loading } from '../../Redux/actions/loading';

const LoginType = ({ title, navigation }) => {
  
  const dispatch = useDispatch();
  
  return (
    <View>
     <Text>Welcome To E-Bind</Text>
     <Text>Who are you?</Text>
     <Button title='PLAYER' onPress={() => navigation.navigate('AuthPlayer', {fromHost: false})} />
     <Button title='HOST' onPress={() => navigation.navigate('AuthHost', {fromHost: true})}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
});

export default LoginType;
