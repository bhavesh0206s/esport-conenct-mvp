import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';


// import React, { useEffect } from 'react';
// import { Button, StyleSheet, View } from 'react-native';
// import { useSelector } from 'react-redux';
// import LottieView from "lottie-react-native";

// const Loading = () => {
//   return(
//     <View style={styles.container}>
//       <LottieView
//         source={require('../assets/loading.json')}
//         autoPlay
//         loop
//       />
//    </View>
//   )
// }

const Loading = () => {

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4ecca3" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});

export default Loading;
