// type snippet rnfs
import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {useSelector, useDispatch } from 'react-redux';
import Loading from '../../../shared/loading';
import { getCurrentProfile } from '../../../Redux/actions/profile';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-elements';
import MyEventDetails from './myEventDetails';

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
  
  
  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        {myEvents.length !== 0  ? (
          <FlatList
            data={myEvents}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <MyEventDetails navigation={navigation} deleteEvent={true} item={item} />}
          />
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Button title='Register Here' buttonStyle={styles.btnStyle} onPress={() => navigation.navigate('Home')}/>
            <Text style={styles.noEvent}>No Event Found!</Text>
            <Text style={styles.refreshText}>Pull down to see if Someone added you in an Event</Text>
          </ScrollView>
        )}
      </>
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
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noEvent:{
    fontSize: 35,
    fontWeight: 'bold',
    paddingBottom: 20
  },
  refreshText:{
    paddingTop:2,
    fontSize: 15,
    paddingBottom: 60
  },
  btnStyle:{
    marginBottom: 25,
    paddingHorizontal: 40,
    paddingVertical: 10,
  }
})

export default MyEvent;

