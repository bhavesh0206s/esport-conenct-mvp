import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

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
        <View style={styles.btnView}>
          <Button 
            titleStyle={{color: 'grey'}}  
            buttonStyle={styles.btnCancel}
            title='CANCEL'
            icon={<MaterialCommunityIcons name="cancel" size={24} color='grey' />}
            onPress={toggleOverlay}   
          />
          <Button 
            buttonStyle={styles.btnOk} 
            icon={<AntDesign name="checkcircleo" size={24} color="#fff" />}
            title='OK'
            onPress={handleOk}
          />
        </View>
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
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
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnOk:{
    paddingHorizontal: 55,
    borderRadius: 0,
    backgroundColor: '#3297fc'
  },
  btnCancel:{
    paddingHorizontal: 40,
    borderRadius: 0,
    backgroundColor: 'transparent'
  }
});

export default ConfirmModal;
