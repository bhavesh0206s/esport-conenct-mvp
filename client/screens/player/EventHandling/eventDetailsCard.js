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
import { getHostProfileById } from '../../../Redux/actions/profile';
import { eventRegistration } from '../../../Redux/actions/event';
import Loading from '../../../shared/loading';
import { CLEARPARTICULARUSER } from '../../../Redux/actions/types';
import ConfirmModal from '../../../shared/confirmModal';

const EventDetailsCard = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { userProfile, hostProfile, loading } = useSelector((state) => ({
    userProfile: state.profile.userProfile,
    hostProfile: state.profile.particularUser,
    loading: state.loading,
  }));
  let eventId = userProfile.myevents.map((item) => item._id);
  const { eventdetails, imageUri, viewingProfile, showhostBy } = route.params;
  const [eventTime, setEventTime] = useState(
    moment(eventdetails.time).format('dddd, MMMM Do YYYY, h:mm:ss a')
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

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
    if (userProfile.email === hostProfile.email) {
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
    dispatch({ type: CLEARPARTICULARUSER });
    dispatch(getHostProfileById(hostedById, navigation));
    navigation.navigate('Userprofile',{isHostProfile: true});
  }

  useEffect(() => {
    navigation.setParams({ 
      title
    })
    dispatch(getHostProfileById(hostedById, navigation, false));
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
          title={viewingProfile ? title: null}
          image={imageUri}
          titleStyle={styles.mainTitle}
          containerStyle={styles.container}
          imageStyle={styles.cardImage}
        >
          <View style={styles.cardView}>
            <Button
              icon={<Icon name="form" type="antdesign" color="#ffffff" />}
              buttonStyle={styles.btnStyle}
              onPress={handleSubmit}
              title="Registration"
            />
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
            {showhostBy && (
              <View>
                <Text style={styles.title}>Hosted by: </Text>
                <TouchableOpacity onPress={showHostProfile} >
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 18}}>{hostProfile.name} </Text>
                    <Text style={{...styles.title, fontSize: 18}}>({hostedBy})</Text>
                  </View>
                  <Text style={{color: '#4ecca3'}}>View Profile</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
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
    borderWidth: 0,
    paddingBottom: 20,
  },
  mainTitle: {
    fontSize: 25,
  },
  cardView:{
    paddingHorizontal: 15
  },  
  cardImage: {
    // marginTop:2,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    // borderRadius: 0,
  },
  btnStyle: {
    borderRadius: 5,
    marginBottom: 20,
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
