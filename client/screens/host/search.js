import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Event from './EventHandling/event';


const Search = ({ navigation }) => {
  const dispatch = useDispatch();
  const searchedEvents = useSelector((state) => state.searchEvent);
  
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
          renderItem={({ item }) => <Event item={[item]} navigation={navigation}/>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchText:{
    fontSize: 21,
    textAlign: 'center',
    paddingTop: 250,
    paddingHorizontal: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  }
});

export default Search;

