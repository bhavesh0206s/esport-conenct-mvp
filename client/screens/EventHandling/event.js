// type snippet rnfs
import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet
} from 'react-native';
import {useSelector } from 'react-redux';
import EventCard from './eventCard';
import Loading from '../../shared/loading';

const Event = ({ navigation }) => {
  const profileInfo = useSelector((state) => state.profile);
  const myEvents = profileInfo.userProfile.myhostedevents;
  const loading = profileInfo.loading;

  if (loading) {
    return <Loading />;
  } else {
    return (
      <View>
        {myEvents && (
          <FlatList
            data={myEvents}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <EventCard item={[item]} />}
          />
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  overlay:{
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    paddingTop: 50,
    marginTop: 80,
    backgroundColor: 'white',
    margin: 0, // This is the important style you need to set
  },
})

export default Event;

