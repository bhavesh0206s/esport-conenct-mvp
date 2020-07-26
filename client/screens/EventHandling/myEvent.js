// type snippet rnfs
import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl
} from 'react-native';
import {useSelector, useDispatch } from 'react-redux';
import EventCard from './eventCard';
import Loading from '../../shared/loading';
import { getCurrentProfile } from '../../Redux/actions/profile';

const MyEvent = ({ navigation }) => {
  const dispatch = useDispatch();
  const {profileInfo, loading} = useSelector((state) =>({ 
    profileInfo: state.profile,
    loading: state.loading
  }));
  const myEvents = profileInfo.userProfile.myevents;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getCurrentProfile());
    setRefreshing(false);
  };

  useEffect(() => {
    dispatch(getCurrentProfile())
  }, [])

  if (loading) {
    return <Loading />;
  } else {
    return (
      <View>
        {myEvents && (
          <FlatList
            data={myEvents}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <EventCard deleteEvent={true} item={[item]} />}
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

export default MyEvent;

