import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { signInAsync, signInHostAsync } from '../../Redux/actions/googleAuth';
import { SocialIcon } from 'react-native-elements';
import { loading } from '../../Redux/actions/loading';

const GoogleSignin = ({ title, fromHost,navigation }) => {
  
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if(fromHost){
      dispatch(signInHostAsync(navigation))
    }else{
      dispatch(signInAsync(navigation));
    }
  }

  return (
    <View>
      <SocialIcon
        title={title}
        button
        style={{ margin: 40 }}
        type="google"
        onPress={handleLogin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
});

export default GoogleSignin;
