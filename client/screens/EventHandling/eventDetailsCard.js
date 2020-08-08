import React, { useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { FontDisplay } from 'expo-font';
import moment from 'moment';
import { useState } from 'react';
import EventRegistration from './eventRegistration';
import { useDispatch, useSelector } from 'react-redux';
import { eventRegistration, getProfileById } from '../../Redux/actions/profile';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Loading from '../../shared/loading';
import { CLEARPARTICULARUSER } from '../../Redux/actions/types';
import ConfirmModal from '../../shared/confirmModal';
import { deleteHostedEvent } from '../../Redux/actions/event';

const EventDetailsCard = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { userProfile, loading } = useSelector((state) => ({
    userProfile: state.profile.userProfile,
    loading: state.loading,
  }));
  let eventId = userProfile.myevents.map((item) => item._id);
  const { eventdetails, imageUri, viewingProfile, showhostBy } = route.params;
  const [eventTime, setEventTime] = useState(
    moment(eventdetails.time).format('dddd, MMMM Do YYYY, h:mm:ss a')
  );

  const [modalOpen, setModalOpen] = useState(false);

  const { name } = route;
  
  const {
    title,
    description,
    game,
    teamsize,
    prizepool,
    entryFee,
    contact,
    hostedBy,
    _id,
    user,
    hostedById,
  } = eventdetails;

  const handleRegistration = () => {
    dispatch(
      eventRegistration({
        registerinfo: {
          email: userProfile.email,
          name: userProfile.name,
          contact: userProfile.contact,
          username: userProfile.username,
          user: userProfile.user,
        },
        eventdetails,
        eventId: _id,
        usereventId: user,
        teamsize,
      })
    );
    setModalOpen(false)
    navigation.navigate('Event');
  };

  const handleSubmit = () =>{
    if (hostedBy === userProfile.username) {
      alert("Host of the Event, can't Register!");
    } else if (eventId.indexOf(_id) !== -1) {
      alert('Already Registered!!');
    } else if(teamsize === 1){
      setModalOpen(true)
    } else {
      navigation.navigate('Register', {
        navigation,
        eventdetails,
        userProfile,
      });
    }
  }
  
  const showHostProfile = () => {
    if(userProfile.username === hostedBy){
      navigation.navigate('Profile');
    }else{
      dispatch({ type: CLEARPARTICULARUSER });
      dispatch(getProfileById(hostedById, navigation));
      navigation.navigate('Userprofile');
    }
  }

  const handleHostEventRemove = () => {
    dispatch(deleteHostedEvent(eventdetails, hostedBy))
    navigation.navigate('Profile');
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
          text='Complete Registration For Single Player Event!' 
          setModalOpen={setModalOpen} 
          modalOpen={modalOpen} 
          handleOk={handleRegistration}
        />
        <Card
          title={title}
          image={imageUri}
          titleStyle={styles.mainTitle}
          containerStyle={styles.container}
          imageStyle={styles.cardImage}
        >
          {name !== 'EventDetailsProfile' ? (
            <Button
              icon={<Icon name="form" type="antdesign" color="#ffffff" />}
              buttonStyle={styles.btnStyle}
              onPress={handleSubmit}
              title="Registration"
            />
          ) : !viewingProfile ? (
            <Button
              icon={<Icon name="delete" color="#ffffff" />}
              buttonStyle={styles.btnStyleDelete}
              onPress={handleHostEventRemove}
              title="REMOVE"
            />
          ) : (
            <></>
          )}
          <Text style={styles.title}>Game: </Text>
          <Text style={styles.field}>{game}</Text>
          <Text style={styles.title}>Teamsize: </Text>
          <Text style={styles.field}>{teamsize}</Text>
          <Text style={styles.title}>Entryfee: </Text>
          <Text style={styles.field}>{entryFee}</Text>
          <Text style={styles.title}>Prize pool: </Text>
          <Text style={styles.field}>{prizepool}</Text>
          <Text style={styles.title}>Date&Time:</Text>
          <Text style={styles.field}>{eventTime.toString()}</Text>
          <Text style={styles.title}>Contact: </Text>
          <Text style={styles.field}>{contact}</Text>
          <Text style={styles.title}>Description:-</Text>
          <Text style={styles.field}>{description}</Text>
          {showhostBy && (
            <View>
              <TouchableOpacity
                onPress={showHostProfile}
              >
              <Text style={styles.title}>HostedBy: </Text>
              <Text style={styles.field}>{hostedBy}</Text>
                <Text>View Profile</Text>
              </TouchableOpacity>
            </View>
          )}
        </Card>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    color: 'grey',
  },
  field: {
    fontSize: 18,
    marginBottom: 10,
  },
  container: {
    margin: 0,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  mainTitle: {
    fontSize: 25,
  },
  cardImage: {
    borderRadius: 20,
  },
  btnStyle: {
    borderRadius: 0,
    marginBottom: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  btnStyleDelete: {
    backgroundColor: 'red',
    borderRadius: 0,
    marginBottom: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
});

export default EventDetailsCard;
