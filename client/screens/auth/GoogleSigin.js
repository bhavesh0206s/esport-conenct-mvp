import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { signInAsync } from '../../Redux/actions/googleAuth';
import { SocialIcon } from 'react-native-elements';

export default function GoogleSignin({ title, navigation }) {
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  //authState is array of [authState, response.data] from action googleAuth
  const dispatch = useDispatch();

  return (
    <View>
      <SocialIcon
        title={title}
        button
        style={{ margin: 40 }}
        type="google"
        onPress={async () => {
          dispatch(signInAsync());
          // if(isAuthenticated) navigation.navigate('Home');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
});
