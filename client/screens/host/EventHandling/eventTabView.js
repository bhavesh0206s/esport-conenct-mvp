import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import EventDetailsCard from './eventDetailsCard';


const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'white' }}
    style={{ backgroundColor: '#839690' }}
  />
);

const EventTabView = ({route, navigation}) => {

  const myEvent= useSelector(state =>state.profile.userProfile.myhostedevents);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'eventDetails' },
    { key: 'second', title: 'participants' },
  ]);

  const eventDetails = () => (
    <View>
       <EventDetailsCard route={route} navigation={navigation} />
    </View>
  );

  const participants = () => {
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
  const renderScene = SceneMap({
    first: eventDetails,
    second: participants,
  });

  useEffect(() => {
    
    navigation.setParams({ 
      title: myEvent[0].title
    })
  },[])

  return (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      style={{ flex: 1 }}
    />
  );
};

export default EventTabView;
