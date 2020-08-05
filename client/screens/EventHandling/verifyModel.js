import React, { useState } from 'react';
import { StyleSheet, View, Keyboard } from "react-native";
import { Button, Text} from 'react-native-elements';
import Modal from 'react-native-modal';
import { TouchableWithoutFeedback, ScrollView} from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { fetchallEvents } from '../../Redux/actions/event';
import { getCurrentProfile } from '../../Redux/actions/profile';


const VerifyModel = ({openPopUp, setOpenPopUp, navigation}) => {
  
  const dispatch = useDispatch()

  const handleSubmit  = () =>{
    setOpenPopUp(false);
    dispatch(fetchallEvents());
    dispatch(getCurrentProfile())
    navigation.goBack()
  }

  return (
    <Modal
      swipeDirection={['left', 'right', 'down']}
      isVisible={openPopUp}
      onBackButtonPress={handleSubmit}
      style={styles.overLay}
      style={styles.contentView}
    >
      <View style={styles.content}>
        <Text style={styles.contentTitle}>Your Event will be hosted after Verification</Text>
        <Button buttonStyle={styles.buttonStyle} onPress={handleSubmit} title='OK'/>
      </View>
    </Modal>
 
  );
}
const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
  },
  contentTitle: {
    fontSize: 17,
    marginBottom: 12,
  },
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
	buttonStyle: {
    height: 50,
    width: 50,
    borderRadius: 100
  },
  contentBtn:{
    margin: 10,
    width: 200
  }
});

export default VerifyModel;