import React from 'react';
import { View, FlatList, } from 'react-native';
import { useSelector } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AchivementCard from '../../../components/achivementCard';
import EventHostedCard from '../../../components/eventHostedCard';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-elements';


const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'white' }}
    style={{ backgroundColor: '#839690' }}
  />
);

const SearchedHostTabView = () => {
  const profileInfo = useSelector((state) => state.profile.particularUser);
  const hostEvents = profileInfo.myhostedevents;
  const navigation = useNavigation();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Reviews' },
    { key: 'second', title: 'Hosted Events' },
  ]);

  const reviews = () => (
    <View>
      <Text>Idar Review Aahe Ge</Text>
    </View>
  );

  const hostedEvents = () => {
    return (
      <View>
        {hostEvents !== null || hostEvents ? (
          <FlatList
            data={hostEvents}
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
    first: reviews,
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

export default SearchedHostTabView;
