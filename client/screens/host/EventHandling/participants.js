import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import EventDetailsCard from './eventDetailsCard';

const Participants = () => {
  return (
    <View>
      <Text>No Participants</Text>
      {/* {myEvents !== null || myEvents ? (
        <FlatList
          data={myEvents}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <EventHostedCard
              navigation={navigation}
              item={item}
              type='ProfileEventHostedCard'
            />
          )}
        />
      ) : null} */}
    </View>
  );
};

export default Participants