import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { signInAsync } from '../../Redux/actions/googleAuth';
import { SocialIcon, Button, Text} from 'react-native-elements';
import { loading } from '../../Redux/actions/loading';

const LoginType = ({ title, navigation }) => {
  
  const dispatch = useDispatch();
  
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.stretch} source={require('../../assets/splash.png')}/>
      </View>
      <Text style={styles.text}>Who are you?</Text>
      <View style={styles.btnContainer}>
        <Button 
          buttonStyle={styles.btnStyle} 
          title='PLAYER' 
          onPress={() => navigation.navigate('AuthPlayer', {fromHost: false})} 
        />
        <Button 
          buttonStyle={styles.btnStyle} 
          title='HOST' 
          onPress={() => navigation.navigate('AuthHost', {fromHost: true})}  
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 200,
  },
  stretch: {
    width: 300,
    height: 150,
    resizeMode: 'stretch',
  },
  text:{
    marginTop: 70,
    fontSize: 30
  },
  btnContainer:{
    flexDirection: 'row',
    margin: 10
  },
  btnStyle:{
    padding: 15,
    paddingHorizontal: 30,
    margin: 10,
  }
});

export default LoginType;
