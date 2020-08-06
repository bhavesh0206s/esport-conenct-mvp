// type snippet rnfs
import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Text
} from 'react-native';
import {useSelector, useDispatch } from 'react-redux';
import MyEventCard from './myEventCard';
import Loading from '../../shared/loading';
import { getCurrentProfile } from '../../Redux/actions/profile';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';

const MyEventDetails = ({ navigation, route }) => {
  const {item} = route.params
  const dispatch = useDispatch();
  const [players, setPlayers] = useState([])
  const {userProfile, allEvents} = useSelector((state) =>({ 
    userProfile: state.profile.userProfile,
    allEvents: state.event.allEvents.map(event => ({eventId: event._id,registeredTeamInfo: event.registeredteaminfo})),
  }));

   useEffect(() =>{
    if(item.teamsize === 1){
      setPlayers([{name: userProfile.name, username: userProfile.username, key: 1}])
    } else{
      let username = userProfile.username
      let currentEvent = allEvents.filter((event) => event.eventId === item._id)
      let playersDetails = currentEvent[0].registeredTeamInfo.map(players => {
        let currentPlayer
        for(let player of players.teammembersinfo){
          if(player.username === username){
            currentPlayer = players.teammembersinfo
            break
          }
        }
        return currentPlayer
      }).filter(item => item !== undefined)
      
      console.log(playersDetails)
      let players = playersDetails[0].map((item, i) => ({name: item.name, username: item.username, key: i}))
      setPlayers(players)
    }

  },[])

  // console.log(allEvents)
  return (
    <View>
      {players.map(({name, username, key}) => (
        <Text key={key}>{name, username}</Text>
      ))}
      {/* <Button title='Press Me' onPress={handleSubmit}/> */}
    </View>
  )
};

const styles = StyleSheet.create({
  overlay:{
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    paddingTop: 50,
    marginTop: 80,
    backgroundColor: 'white',
    margin: 0, // This is the important style you need to set
  },
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noEvent:{
    fontSize: 35,
    fontWeight: 'bold',
    paddingBottom: 20
  },
  refreshText:{
    paddingTop:2,
    fontSize: 15,
    paddingBottom: 60
  },
  btnStyle:{
    marginBottom: 25,
    paddingHorizontal: 40,
    paddingVertical: 10,
  }
})

export default MyEventDetails;

