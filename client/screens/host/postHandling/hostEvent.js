import React, { useState } from 'react';
import { StyleSheet, View, Keyboard  } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback, ScrollView} from 'react-native-gesture-handler';
import AddEvent from '../EventHandling/addEvent';
import VerifyModel from '../EventHandling/verifyModel';

const HostEventModal = ({ toggleHostEventModal, hostEvent }) => {


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Modal
        animationIn='bounce'
        animationOut='bounceIn'
        isVisible={hostEvent}
        onBackButtonPress={toggleHostEventModal}
        style={styles.contentView}
      >
        <View style={styles.header}>
          <Button
            buttonStyle={styles.btnStyle}
            icon={
              <MaterialCommunityIcons
                style={styles.icon}
                name="sword-cross"
                size={24}
                color="white"
              />
            }
            onPress={toggleHostEventModal}
          />
          <View style={styles.headerContent}>
            <Text style={styles.headerTextMain}>Host Event</Text>
          </View>
        </View>

        <ScrollView>
          <View style={styles.content}>
            <AddEvent hostEvent={hostEvent} setModalOpen={toggleHostEventModal}/>
          </View>
        </ScrollView>
      </Modal>
      
      </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'grey',
  },
  btnStyle: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: 'grey',
  },
  headerContent: {
    flexDirection: 'row',
  },
  submitPost: {
    top: 5,
    marginLeft: 120,
    backgroundColor: 'grey',
  },
  headerTextMain: {
    top: 10,
    paddingLeft: 20,
    fontSize: 20,
    color: 'white',
  },
  content: {
    flex: 1,
    fontSize: 20,
    marginBottom: 12,
  },
  contentView: {
    backgroundColor: '#232931',
    margin: 0,
  },
  input: {
    paddingHorizontal: 30,
    fontSize: 18,
  },
});

export default HostEventModal;
