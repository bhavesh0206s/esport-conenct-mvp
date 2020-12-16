import React, { useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { signInAsync, signInHostAsync } from '../../Redux/actions/googleAuth';
import { SocialIcon } from 'react-native-elements';

const GoogleSignin = ({ title, fromHost, navigation, googleBtnStyle }) => {
  
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
        style={googleBtnStyle}
        type="google"
        onPress={handleLogin}
      />
    </View>
  );
}


export default GoogleSignin;
