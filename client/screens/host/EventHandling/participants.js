import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Card, ListItem, Icon, BottomSheet, Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

const Participants = () => {

  const myEvent = useSelector(state => state.details)
  const [singlePlayers, setSinglePlayers] = useState([])
  const [teams, setTeams] = useState([])
  const [openPlayerInfo, setOpenPlayerInfo] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [name, setName] = useState('');

  const handlePlayeInfo = (username, email, name) => {
    setOpenPlayerInfo(!openPlayerInfo);
    setUsername(username);
    setEmail(email);
    setName(name);
  }

  const toggleModal = () => setOpenPlayerInfo(!openPlayerInfo);

  useEffect(() =>{
 
    const {teamsize, registeredteaminfo, registeredplayerinfo} = myEvent.eventdetails;
    if(teamsize === 1){
      setSinglePlayers(registeredplayerinfo);
    } else{
      let teamsInfo = registeredteaminfo.map((team, i) => ({teamMembers: team.teammembersinfo}));
      setTeams(teamsInfo);
    }

  }, []);
  
  return (
    <View>
       {(singlePlayers.length === 0 && teams.length === 0 ) ? (
        <Text>No Participants</Text>
      ) : (
          <View>
            {
              teams.map((team, i) => (
                <Card containerStyle={styles.card}>
                {team.teamMembers.map(({name, username, email}, i) =>(
                  <>
                    <TouchableOpacity onPress={() => handlePlayeInfo(username, email, name)} >
                      <ListItem bottomDivider key={i}>
                      <Avatar
                        size="small"
                        rounded
                        icon={{ name: "user", type: "font-awesome-5", color:'black' }}
                      />
                        <ListItem.Content>
                          <ListItem.Title>{name}</ListItem.Title>
                        </ListItem.Content>
                      </ListItem>
                    </TouchableOpacity>
                  </>
                ))}
              </Card>
              ))
            }
             <Modal
              onSwipeComplete={toggleModal}
              swipeDirection={['left', 'right', 'down']}
              isVisible={openPlayerInfo}
              onBackButtonPress={toggleModal}
              style={styles.overLay}
              onBackdropPress={toggleModal}
              style={styles.contentView}
            >
              <View style={styles.content}>
                <Text>Name: {name}</Text>
                <Text>Username: {username}</Text>
                <Text>Email: {email}</Text>
                <ListItem containerStyle={{ backgroundColor: 'red' }} onPress={() =>setOpenPlayerInfo(!openPlayerInfo)}>
                  <ListItem.Content>
                    <ListItem.Title  style={{ color: 'white' }}>Cancel</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              </View>
            </Modal>
          </View>
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
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
  },
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
})
  

export default Participants