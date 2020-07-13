import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, RefreshControl, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../shared/loading';
import { fetchallEvents } from '../Redux/actions/event';
import EventCard from './EventHandling/eventCard';

const Home = () => {
  const dispatch = useDispatch();
  const {allEvents, userProfile} = useSelector((state) => ({
    allEvents: state.event.allEvents,
    userProfile: state.profile.userProfile,
  }));
  
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchallEvents());
    setRefreshing(false);
  }

  useEffect(() => {
    console.log('Home Page refreshed');
    setTimeout(() => dispatch(fetchallEvents()), 100)
  }, []);

  if (allEvents.length === 0 || !userProfile) {
    return <Loading />;
  } else {
    return (
      <View>
        <FlatList
          nestedScrollEnabled
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          extraData={allEvents}
          data={allEvents}
          onEndReachedThreshold={0.5}
          initialNumToRender={6}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <EventCard item={[item]} />}
        />
      </View>
    );
  }
};

export default Home;