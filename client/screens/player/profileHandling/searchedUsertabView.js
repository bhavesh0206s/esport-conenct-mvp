import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AchivementCard from '../../../components/achivementCard';

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

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Achivements' },
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

  const renderScene = SceneMap({
    first: achivements,
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
