import React, { useState, useEffect } from 'react';
import { View, FlatLis, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Card, ListItem, Icon, BottomSheet, Avatar, Text, Button  } from 'react-native-elements';
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
                      <ListItem containerStyle={styles.listContainer} bottomDivider key={i}>
                      <Avatar
                        size="small"
                        rounded
                        icon={{ name: "user", type: "font-awesome-5", color:'white' }}
                      />
                        <ListItem.Content>
                          <ListItem.Title >{name}</ListItem.Title>
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
              onBackdropPress={toggleModal}
              style={styles.contentView}
            >
              <View style={styles.content}>
                <Text style={styles.title}>Name: </Text>
                <Text style={styles.field}>{name}</Text>
                <Text style={styles.title}>Username: </Text>
                <Text style={styles.field}>{username}</Text>
                <Text style={styles.title}>Email: </Text>
                <Text style={styles.field}>{email}</Text>
              </View>
              <Button 
                titleStyle={{color: 'grey'}}  
                buttonStyle={styles.btnCancel}
                title='CANCEL'
                titleStyle={{color: '#eeeeee'}}
                onPress={() => setOpenPlayerInfo(!openPlayerInfo)}   
              />
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
    borderRadius: 12,
    backgroundColor: '#232931',
    elevation: 4,
    shadowColor: '#4ecca3',
  },
  content: {
    backgroundColor: '#232931',
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
  listContainer: {
    backgroundColor: '#232931',
    padding: 5
  },
  btnCancel:{
    borderRadius: 0,
    backgroundColor: '#d9534f',
    color: '#eeeeee'
  },
  title: {
    color: '#95bdb5',
  },
  field: {
    fontSize: 18,
    marginBottom: 10,
  },
})
  

export default Participants