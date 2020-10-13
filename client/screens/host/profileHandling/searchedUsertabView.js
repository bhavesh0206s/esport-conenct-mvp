import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AchivementCard from '../../../components/achivementCard';
import EventHostedCard from '../../../components//evnetHostedCard';
import { useNavigation } from '@react-navigation/native';

const achivementData = [
  {
    id: '4561232',
    title: 'Pubg Winner',
  },
  {
    id: '7894654',
    title: 'COD Winner',
  },
  {
    id: '7989878',
    title: 'Clash Royale',
  },
];

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'white' }}
    style={{ backgroundColor: '#839690' }}
  />
);

const SearchedUserTabView = () => {
  const profileInfo = useSelector((state) => state.profile.particularUser);
  const myEvents = profileInfo.myhostedevents;
  const navigation = useNavigation();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Achivements' },
    { key: 'second', title: 'Hosted Events' },
  ]);

  const achivements = () => (
    <View>
      <FlatList
        data={achivementData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AchivementCard title={item.title} />}
      />
    </View>
  );

  const hostedEvents = () => {
    return (
      <View>
        {myEvents !== null || myEvents ? (
          <FlatList
            data={myEvents}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <EventHostedCard
                navigation={navigation}
                item={item}
                type='SearchedUserEventHostedCard'
              />
            )}
          />
        ) : null}
      </View>
    );
  };
  const renderScene = SceneMap({
    first: achivements,
    second: hostedEvents,
  });

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

export default SearchedUserTabView;
