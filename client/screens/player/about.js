import React from 'react';
import { View } from "react-native";
import { Image } from 'react-native-elements';

const About = () => {
  return (
    <View>
      <Image
        source={require('../../assets/about.jpg')}
        style={{width: 360, height:  200}}
      />
    </View>
  );
}
 
export default About;