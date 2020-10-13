import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, ActivityIndicator, StyleSheet, ImageBackground } from "react-native";
import { Text, Card, Button, Icon, Image } from "react-native-elements";
import { gameImage } from "../../../shared/gameImage";
import moment from 'moment';
import { useSelector, useDispatch } from "react-redux";
import { deleteMyEvent, fetchEventDetails } from "../../../Redux/actions/event";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import ConfirmModal from "../../../shared/confirmModal";
import MyEventCard from "../../../components/myEventCard";

const MyEventDetails = ({ item, navigation, deleteEvent}) => {
  const [imageUri, setImageUri] = useState("sd");
  const [modalOpen, setModalOpen] = useState(false);

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

  useEffect(() => {
    
    if (item.game === "PUBG") {
      setImageUri(gameImage.pubg.uri);
    } else if (item.game === "COD") {
      setImageUri(gameImage.cod.uri);
    } else {
      setImageUri(gameImage.clashRoyale.uri);
    }
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
        handleSubmit={showDetails}
        imageUri={imageUri}
      />
      <View>
        <Button
          buttonStyle={styles.btnStyleDelete}
          icon={<MaterialCommunityIcons name="cancel" size={15} color='#fff' />}
          onPress={() => setModalOpen(true)}
          title="EXIT"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  btnStyleDelete:{
    backgroundColor: '#d9534f',
    borderRadius: 0,
    marginBottom: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
})

export default MyEventDetails;
