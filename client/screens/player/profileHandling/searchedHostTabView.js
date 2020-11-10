import React, { useEffect } from 'react';
import { View, FlatList, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AchivementCard from '../../../components/achivementCard';
import EventHostedCard from '../../../components/eventHostedCard';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-elements';
import ReviewCard from '../../../components/reviewCard';
import { getReviews } from '../../../Redux/actions/review';
import Loading from "../../../shared/loading"

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'white' }}
    style={{ backgroundColor: '#839690' }}
  />
);

const SearchedHostTabView = () => {
  const dispatch = useDispatch();
  const { profileInfo, hostReviews, loading } = useSelector((state) => ({
    profileInfo: state.profile.particularUser,
    hostReviews: state.review,
    loading: state.loading
  }));
  const hostEvents = profileInfo.myhostedevents;
  const navigation = useNavigation();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Reviews' },
    { key: 'second', title: 'Hosted Events' },
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

  useEffect(() => {
    dispatch(getReviews(profileInfo.user))
  }, []);

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
