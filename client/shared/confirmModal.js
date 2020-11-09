import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'; 

const ConfirmModal = ({text, handleOk, modalOpen, setModalOpen}) => {;

  const toggleOverlay = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <Modal
      animationIn="bounceIn"
      backdropOpacity={0.8}
      onSwipeComplete={toggleOverlay}
      swipeDirection={['up', 'left', 'right', 'down']}
      isVisible={modalOpen}
      onBackButtonPress={toggleOverlay}
      style={styles.overLay}
      onBackdropPress={toggleOverlay}
    >
      <View style={styles.content}>
        <Text style={styles.contentTitle}>{text}</Text>
        <View style={styles.btnContainer}>
          <View style={styles.btnView}>
            <Button 
              titleStyle={{color: '#fff'}}  
              buttonStyle={styles.btnCancel}
              title='CANCEL'
              icon={<MaterialCommunityIcons name="cancel" size={24} color='#fff' />}
              onPress={toggleOverlay}   
            />
          </View>
          <View style={styles.btnView}>
            <Button 
              buttonStyle={styles.btnOk} 
              icon={<AntDesign name="checkcircleo" size={24} color="#fff" />}
              title='OK'
              onPress={handleOk}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#393e46',
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    textAlign:'center',
    paddingVertical: 30,
    paddingHorizontal: 5,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnView: {
    flex: 1,
  },
  btnOk:{
    borderRadius: 0,
    backgroundColor: '#4ecca3'
  },
  btnCancel:{
    borderRadius: 0,
    backgroundColor: '#d9534f'
  }
});

export default ConfirmModal;
