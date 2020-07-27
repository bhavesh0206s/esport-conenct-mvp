import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../shared/loading';
import { fetchallEvents } from '../Redux/actions/event';
import EventCard from './EventHandling/eventCard';


const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { allEvents, loading } = useSelector((state) => ({
    allEvents: state.event.allEvents,
    loading: state.loading
  }));

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchallEvents());
    setRefreshing(false);
  };

  useEffect(() => {
    console.log('Home Page refreshed');
    setTimeout(() => dispatch(fetchallEvents()), 100);
  }, []);


  if (loading) {
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
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <EventCard item={[item]} navigation={navigation} />
          )}
        />
      </View>
    );
  }
};

export default Home;
