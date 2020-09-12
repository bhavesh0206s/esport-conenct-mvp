import React, { useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eventRegistration, getProfileById } from '../../../Redux/actions/profile';
import Loading from '../../../shared/loading';
import { CLEARPARTICULARUSER } from '../../../Redux/actions/types';
import ConfirmModal from '../../../shared/confirmModal';
import { deleteHostedEvent } from '../../../Redux/actions/event';
import { useRoute } from '@react-navigation/native';

const EventDetailsCard = ({ navigation }) => {

  const dispatch = useDispatch();
  const { hostProfile, loading,eventInfo } = useSelector((state) => ({
    hostProfile: state.profile.userProfile,
    loading: state.loading,
    eventInfo: state.details
  }));
  console.log(eventInfo)
  const { eventdetails, imageUri, viewingProfile, showhostBy } = eventInfo;
  const [eventTime, setEventTime] = useState(
    moment(eventdetails.time).format('dddd, MMMM Do YYYY, h:mm:ss a')
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  
  const {
    title,
    description,
    game,
    teamsize,
    prizepool,
    entryFee,
    contact,
  } = eventdetails;

  const handleRegistration = () => {
    setModalOpen(false)
    navigation.navigate('Event');
  };

  const handleHostEventRemove = () => {
    let hostedBy = hostProfile.username;
    console.log(hostedBy)
    dispatch(deleteHostedEvent(eventdetails, hostedBy))
    navigation.navigate('Home');
  };

  useEffect(() => {
    navigation.setParams({ 
      title
    })
  },[])

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  } else {
    return (
      <ScrollView>
        <ConfirmModal 
          text='Are You Sure?' 
          setModalOpen={setRemoveModalOpen} 
          modalOpen={removeModalOpen} 
          handleOk={handleHostEventRemove}
        />
        <Card containerStyle={styles.container} >
          <Card.Title style={styles.mainTitle}>{title}</Card.Title>
          <Card.Image source={imageUri} style={styles.cardImage} />
          <Button
            icon={<Icon name="delete" color="#ffffff" />}
            buttonStyle={styles.btnStyleDelete}
            onPress={() => setRemoveModalOpen(true)}
            title="REMOVE"
          />
          <View style={styles.cardView}>
            <Text style={styles.title}>Game: </Text>
            <Text style={styles.field}>{game}</Text>
            <Text style={styles.title}>Teamsize: </Text>
            <Text style={styles.field}>{teamsize}</Text>
            <Text style={styles.title}>Entryfee: </Text>
            <Text style={styles.field}>{entryFee}</Text>
            <Text style={styles.title}>Prize pool: </Text>
            <Text style={styles.field}>{prizepool}</Text>
            <Text style={styles.title}>Date & Time:</Text>
            <Text style={styles.field}>{eventTime.toString()}</Text>
            <Text style={styles.title}>Contact: </Text>
            <Text style={styles.field}>{contact}</Text>
            <Text style={styles.title}>Description:-</Text>
            <Text style={styles.field}>{description}</Text>
          </View>
        </Card>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    color: '#95bdb5',
  },
  field: {
    fontSize: 18,
    marginBottom: 10,
  },
  container: {
    margin: 0,
    borderWidth: 0,
    paddingBottom: 20,
  },
  mainTitle: {
    fontSize: 25,
    color: '#eeeeee'
  },
  cardView:{
    paddingHorizontal: 10
  },  
  cardImage: {
    margin: 10,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  btnStyleDelete: {
    backgroundColor: '#d9534f',
    borderRadius: 5,
    marginBottom: 20,
    marginHorizontal: 10
    // borderBottomLeftRadius: 50,
    // borderBottomRightRadius: 50,
  },
});

export default EventDetailsCard;
