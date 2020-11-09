import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ReviewCard from '../../../components/reviewCard';
import { Rating } from 'react-native-elements';

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

const HostProfileTabView = ({hostReviews, averageRating}) => {
  
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Reviews' },
  ]);

  const reviews = () => (
    <View>
      <Rating  
        imageSize={30} 
        readonly 
        tintColor='#393e46s'
        startingValue={averageRating}
      />
      <FlatList
        data={hostReviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReviewCard item={item} />}
      />
    </View>
  );

  const renderScene = SceneMap({
    first: reviews,
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

export default HostProfileTabView;
