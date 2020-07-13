import React, { useState } from 'react';
import { StyleSheet, View, Keyboard } from "react-native";
import { Button, Text} from 'react-native-elements';
import Modal from 'react-native-modal';
import { TouchableWithoutFeedback, ScrollView} from 'react-native-gesture-handler';


const VerifyModel = ({openPopUp, setOpenPopUp}) => {

  return (
    <Modal
      onSwipeComplete={() => setOpenPopUp(false)}
      swipeDirection={['left', 'right', 'down']}
      isVisible={openPopUp}
      onBackButtonPress={() => setOpenPopUp(false)}
      style={styles.overLay}
      onBackdropPress={() => setOpenPopUp(false)}
      style={styles.contentView}
    >
      <View style={styles.content}>
        <Text>Your Event will be hosted after Verification</Text>
      </View>
    </Modal>
 
  );
}
const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
	buttonStyle: {
    height: 60,
    width: 60,
    backgroundColor: '#4ecca3',
    borderRadius: 100
  },
  contentBtn:{
    margin: 10,
    width: 200
  }
});

export default VerifyModel;