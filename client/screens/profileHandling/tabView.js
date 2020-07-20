import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TabView, SceneMap } from "react-native-tab-view";
import EventCard from '../EventHandling/eventCard';
import Loading from '../../shared/loading';
import AchivementCard from "./achivementCard";

const achivementData = [
  {
    id: 4561232,
    title: 'Pubg Winner'
  },
  {
    id: 7894654,
    title: 'COD Winner'
  },
  {
    id: 7989878,
    title: 'Clash Royale'
  }
]

const ProfileTabView = () => {

  const profileInfo = useSelector((state) => state.profile);
  const myEvents = profileInfo.userProfile.myevents;
  const loading = profileInfo.loading;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Achivements" },
    { key: "second", title: "Hosted Events" },
  ]);
  
  const achivements = () => (
    <View>
      <FlatList 
        data={achivementData}
        keyExtractor={item => item.id}
        renderItem={({item}) => <AchivementCard title={item.title}/>}
      />
    </View>
  )

  const hostedEvents = () => {
    return (
      <View>
        {myEvents !== null || !myEvents ? (
          <FlatList
            data={myEvents}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <EventCard item={[item]} />}
          />
        ) : null}
      </View>
    );
  }
  const renderScene = SceneMap({
    first: achivements,
    second: hostedEvents,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      style={{flex: 1}}
    />
  );
};


export default ProfileTabView;
