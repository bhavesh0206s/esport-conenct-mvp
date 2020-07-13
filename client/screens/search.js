import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Profiles from '../screens/profileHandling/profiles';
import EventCard from './EventHandling/eventCard';

const Search = ({ navigation }) => {
  const dispatch = useDispatch();
  const searchedevents = useSelector((state) => state.event.searchedevents);

  return (
    <View>
      {!searchedevents? (
        <Text>
          Hey search for some events and show your gaming skill in it....
        </Text>
      ) : (
        <FlatList
          data={searchedevents}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <EventCard item={[item]} />}
        />
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
