import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import EventDetailsCard from './eventDetailsCard';

const Participants = () => {

  // const myEvent = useSelector(state => state.userProfile.myhostedevents)

  // useEffect(() =>{
  //   const {teamsize, registeredteaminfo, registeredplayerinfo} = myEvent;
  //   if(teamsize === 1){
      
  //   } else{

  //   }

  // }, [])
  
  // console.log(allEvents)
  return (
    <View>
      <Text>No Participants</Text>
      
    </View>
  );
};

export default Participants