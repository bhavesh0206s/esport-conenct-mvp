import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { signInAsync } from '../../Redux/actions/googleAuth';
import { SocialIcon } from 'react-native-elements';
import { loading } from '../../Redux/actions/loading';

export default function GoogleSignin({ title, navigation }) {
  
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading)

  return (
    <View>
      <SocialIcon
        title={title}
        button
        style={{ margin: 40 }}
        type="google"
        onPress={async () => {
          dispatch(signInAsync());
          if(!loading){
            navigation.navigate('UserName')
          }
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
