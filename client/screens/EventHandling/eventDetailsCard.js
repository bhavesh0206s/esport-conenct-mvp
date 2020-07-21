import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { FontDisplay } from 'expo-font';
import moment from 'moment';
import { useState } from 'react';
import EventRegistration from './eventRegistration';
import { useDispatch, useSelector } from 'react-redux';
import { eventRegistration } from '../../Redux/actions/profile';

const EventDetailsCard = ({ route }) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.userProfile);
  const { eventdetails, imageUri } = route.params;
  const [eventTime, setEventTime] = useState(
    moment(eventdetails.time).format('dddd, MMMM Do YYYY, h:mm:ss a')
  );

  // Setting the visibility of Modal
  const [modalOpen, setModalOpen] = useState(false);

  const {
    title,
    description,
    game,
    teamsize,
    prizepool,
    entryFee,
    contact,
    _id,
  } = eventdetails;
  return (
    <ScrollView>
      <Card
        title={title}
        image={imageUri}
        titleStyle={{ fontSize: 20 }}
        containerStyle={{ marginBottom: 20 }}
      >
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
        <Button
          icon={<Icon name="form" type="antdesign" color="#ffffff" />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          onPress={() => {
            if (teamsize <= 1) {
              dispatch(
                eventRegistration({
                  registerinfo: {
                    email: userProfile.email,
                    name: userProfile.name,
                    contact: userProfile.contact,
                  },
                  eventdetails,
                  eventId: _id,
                  usereventId: userProfile.user,
                  teamsize,
                })
              );
            } else {
              setModalOpen(true);
            }
          }}
          title="Registration"
        />
      </Card>
      <Modal visible={modalOpen} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <EventRegistration
            eventdetails={eventdetails}
            userProfile={userProfile}
            setModalOpen={setModalOpen}
          />
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'grey',
  },
  field: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default EventDetailsCard;
