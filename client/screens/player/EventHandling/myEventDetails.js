import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, ActivityIndicator, StyleSheet, ImageBackground } from "react-native";
import { Text, Card, Button, Icon, Image } from "react-native-elements";
import { gameImage } from "../../../shared/gameImage";
import moment from 'moment';
import { useSelector, useDispatch } from "react-redux";
import { deleteMyEvent } from "../../../Redux/actions/event";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import ConfirmModal from "../../../shared/confirmModal";
import MyEventCard from "../../../components/myEventCard";

const MyEventDetails = ({ item, navigation, deleteEvent}) => {
  const [imageUri, setImageUri] = useState("sd");
  const [modalOpen, setModalOpen] = useState(false);
  const [isEventOver, setIsEventOver] = useState(false)

  const {currentUserUsername, eventDetail} = useSelector((state) => ({
    currentUserUsername: state.profile.userProfile.username,
    eventDetail: state.event.eventDetail
  }))
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(deleteMyEvent(item, currentUserUsername))
  }

  const showDetails = () => {
    navigation.navigate('My Event Details', { item, eventDetail })
  }

  const checkDate = (eventDate) => {
    const currentDate = new Date(); 
    eventDate = new Date(eventDate);
    if(currentDate.getTime() > eventDate.getTime()){
      setIsEventOver(true)
    }
  }

  useEffect(() => {
    if (item.game === 'PUBG') {
      setImageUri(gameImage.pubg.uri);
    } else if (item.game === 'COD') {
      setImageUri(gameImage.cod.uri);
    } else if (item.game === 'Clash Royale') {
      setImageUri(gameImage.clashRoyale.uri);
    } else{
      setImageUri(gameImage.coc.uri)
    }

    checkDate(item.time)

  }, []);

  return (
    <>
      <ConfirmModal
        text='Are You Sure?' 
        setModalOpen={setModalOpen} 
        modalOpen={modalOpen} 
        handleOk={handleSubmit}
      />
      <MyEventCard 
        item={item}
        isEventOver={isEventOver}
        handleSubmit={showDetails}
        imageUri={imageUri}
      />
      <View style={styles.mainBtnContainer}>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.btnStyle}
            onPress={showDetails}
            title="TEAM INFO"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.btnStyleDelete}
            icon={<MaterialCommunityIcons name="cancel" size={15} color='#fff' />}
            onPress={() => setModalOpen(true)}
            title="EXIT"
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainBtnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
  btnStyleDelete:{
    backgroundColor: '#d9534f',
    borderRadius: 0,
  },
  btnStyle:{
    borderRadius: 0,
    // marginBottom: 20,
  },
})

export default MyEventDetails;
