import React, { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { Button, Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import HostEventModal from './hostEvent';
import { useDispatch, useSelector } from 'react-redux';
import { modal } from '../../Redux/actions/modal';

export default UploadPostModal = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const visibleHost = useSelector(state => state.modal);

  const toggleHostEventModal = () =>{
    dispatch(modal(!visibleHost))
    setVisible(false);
  }

  const toggleModal = () =>{
    
    setVisible(!visible);
  }
  
  return (
    <>
      {visibleHost ? (
        <HostEventModal toggleHostEventModal={toggleHostEventModal} hostEvent={visibleHost} />
      ) : (
        <View>
          <Button onPress={() => setVisible(true)}
            buttonStyle={styles.buttonStyle}
            icon={
              <AntDesign name="pluscircle" size={30} color='gray' />
            }
          />
          <View style={styles.container}>
            <Modal
              onSwipeComplete={toggleModal}
              swipeDirection={['left', 'right', 'down']}
              isVisible={visible}
              onBackButtonPress={toggleModal}
              style={styles.overLay}
              onBackdropPress={toggleModal}
              style={styles.contentView}
            >
              <View style={styles.content}>
                <Button buttonStyle={styles.contentBtn} onPress={toggleHostEventModal} title='Host Event'/>
              </View>
            </Modal>
          </View>
        </View>
      )}
    </>
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