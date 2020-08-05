import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import EventCard from './EventHandling/eventCard';

const Search = ({ navigation }) => {
  const dispatch = useDispatch();
  const searchedevents = useSelector((state) => state.event.searchedevents);

  return (
    <View>
      {!searchedEvents || searchedEvents.length === 0 ? (
        <Text style={styles.searchText}>
          Hey! search for events and show your gaming skill in it....
        </Text>
      ) : (
        <FlatList
          data={searchedEvents}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <EventCard item={[item]} navigation={navigation} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchText: {
    fontSize: 21,
    textAlign: 'center',
    paddingTop: 250,
    paddingHorizontal: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default Search;
