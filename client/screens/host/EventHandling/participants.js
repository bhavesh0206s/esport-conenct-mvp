import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import EventDetailsCard from './eventDetailsCard';


const Participants = () => {

  const myEvent = useSelector(state => state.details)
  const [singlePlayers, setSinglePlayers] = useState([])
  const [team, setTeam] = useState([])
  console.log(myEvent);
  useEffect(() =>{
    
    const {teamsize, registeredteaminfo, registeredplayerinfo} = myEvent.myhostedevents;
    if(teamsize === 1){
      setSinglePlayers(registeredplayerinfo);
    } else{
      team = registeredteaminfo.map((team, i) => ({teamMember: team.teammembersinfo, index: i}));
      setTeam(team);
      console.log(team)
    }

  }, []);
  
  return (
    <View>
       {(singlePlayers.length === 0 || team.length === 0 ) ? (
        <Text>No Participants</Text>
      ) : (
        <Card containerStyle={{margin: 0}} title={teamsize !== 1 && 'TEAM MEMBERS' } >
          <View style={styles.card}>
            {
              players.map(({name, username, key, teamLeader}) => (
                <TouchableOpacity key={key} >
                  <ListItem
                    roundAvatar
                    title={name}
                    subtitle={teamLeader ? `${username}: (Teamleader)` : username}
                    leftIcon={<Icon  name="user" type="font-awesome-5" color='black' />}
                    bottomDivider
                  />
                </TouchableOpacity>
              ))
            }
          </View>
        </Card>
      )}
    </View>
  )
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    marginBottom: 5,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#666666',
  },
})
  return (
    <View>
     
      
    </View>
  );
};

export default Participants