import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { signInAsync } from '../../Redux/actions/googleAuth';
import { SocialIcon } from 'react-native-elements';
import { loading } from '../../Redux/actions/loading';

export default function GoogleSignin({ title, navigation }) {
  
  const dispatch = useDispatch();
  
  return (
    <View>
      <SocialIcon
        title={title}
        button
        style={{ margin: 40 }}
        type="google"
        onPress={async () => {
          dispatch(signInAsync(navigation));
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
