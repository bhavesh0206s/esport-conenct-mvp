// type snippet rnfs
import React, { useState, useEffect } from 'react';
import { View, StyleSheet} from 'react-native';
import {useSelector, useDispatch } from 'react-redux';
import Loading from '../../../shared/loading';
import { Rating, AirbnbRating } from 'react-native-elements'
import { getProfile } from '../../../Redux/actions/profile';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, ListItem, Card, Icon, Avatar } from 'react-native-elements';
import { getUserEventInfo } from '../../../Redux/actions/userEvent';

const MyEventTeamDetails = ({ navigation, route }) => {
  const {item, eventDetail} = route.params;
  
  const dispatch = useDispatch();

  const [players, setPlayers] = useState([]);

  const {userProfile, userEventInfo, loading} = useSelector((state) =>({ 
    userProfile: state.profile.userProfile,
    loading: state.loading,
    userEventInfo: state.userEventInfo
  }));

  const handleProfileSubmit = (username) =>{
    if(userProfile.username === username){
      navigation.navigate('Profile');
    }else{
      dispatch(getProfile(username));
      navigation.navigate('Userprofile', {isHostProfile: false});
    }
  }
  
  const renderPlayers = (name, username, key, teamLeader) =>(
    <TouchableOpacity key={key} onPress={() => handleProfileSubmit(username)}>
      <ListItem containerStyle={styles.listContainer} bottomDivider>
        <Avatar
          size="medium"
          rounded
          icon={{name:"user", type:"font-awesome-5", color:'white'}}
        />
        <ListItem.Content>
          <ListItem.Title>{name}</ListItem.Title>
          <ListItem.Subtitle style={{color: '#95bdb5'}}>
            {teamLeader ? `${username} (Teamleader)` : username}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  )

  const ratingCompleted = (rating)  => {
    console.log("Rating is: " + rating);
  }
  

  useEffect(() =>{
    navigation.setParams({title: item.title});
    if(item.teamsize === 1){
      setPlayers([{name: userProfile.name, username: userProfile.username, key: 1}]);
    } else{
      
      let username = userProfile.username
      dispatch(getUserEventInfo(username, item._id));
    }
  },[])

  if(loading){
    return <Loading/>
  }
  else{
    return (
      <View>
        <AirbnbRating 
          // starStyle={}
          ratingBackgroundColor={'green'}
        />
        <Card containerStyle={{margin: 0, borderWidth: 0}} >
          <Card.Title style={styles.mainTitle}>{item.teamsize !== 1 && 'TEAM MEMBERS'}</Card.Title>
          <View style={styles.card}>
            {
              item.teamsize === 1 ? (
                players.map(({name, username, key, teamLeader}) => (
                  renderPlayers(name, username,key, teamLeader)
                ))
              ) :(
                userEventInfo.map(({name, username, key, teamLeader}) => (
                  renderPlayers(name, username,key, teamLeader)
                ))
              )
            }
          </View>
        </Card>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 2,
    marginBottom: 5,
    backgroundColor: '#232931',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#4ecca3',
  },
  listContainer: {
    backgroundColor: '#232931'
  },
  mainTitle: {
    color: '#eeeeee'
  }
})

export default MyEventTeamDetails;

