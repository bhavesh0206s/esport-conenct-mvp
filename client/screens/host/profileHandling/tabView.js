import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ReviewCard from '../../../components/reviewCard';
import { Icon, Rating, Text } from 'react-native-elements';

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
      <View style={{flexDirection: 'row', justifyContent: 'center', padding: 5}}>
        <Text style={{fontSize: 20, color: "#95bdb5"}}>Average Rating : </Text>
        <Icon
          name='grade'
          size={25}
          color='#4ecca3'
        />
        <Text style={{paddingLeft: 5, fontSize: 20}}>
          {hostReviews.reduce((a, b) => (a + b.rating), 0) / hostReviews.length} / 5
        </Text>
      </View>
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
