import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import { Card} from 'react-native-elements'
import Profiles from '../profileHandling/profiles';
import { useDispatch, useSelector } from 'react-redux';

const EventRegistration = ({ route }) => {
  const dispatch = useDispatch();
  const { eventdetails, userProfile } = route.params
  const teamLeaderProfile = useSelector((state) => state.profile.profiles);
  const [teamMember, setTeamMember] = useState([
    {
      user: userProfile.user,
      email: userProfile.email,
      name: userProfile.name,
      username: userProfile.username,
    },
  ]);
  const arrayUnique = (arr, uniqueKey) =>{
    const flagList = []
    return arr.filter((item) => {
      if (flagList.indexOf(item[uniqueKey]) === -1) {
        flagList.push(item[uniqueKey])
        return true
      }
    })
  }

  const handlingTeamMember = (memberDetail) => {
    if(memberDetail.username === eventdetails.hostedBy){
      alert("You can't add Host of the Event.");
    }else{
      memberDetail = {
        user: memberDetail.user, 
        name: memberDetail.name, 
        email: memberDetail.email, 
        username: memberDetail.username
      }
      let teamMemberList = [...teamMember, memberDetail];
      
      teamMemberList = arrayUnique(teamMemberList, 'username')
      setTeamMember(teamMemberList);
    }
  };

  const removeTeamMember = (username) =>{
    console.log('username:',username)
    const teamMemberAfterRemove = teamMember.filter((item, i) => {
      if(item.username !== username){
        return true
      }
    })

    setTeamMember(teamMemberAfterRemove)
  }

  return (
    <View>
      <View>
        <FlatList
          data={teamLeaderProfile}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Profiles
              item={[item]}
              adding={true}
              handlingTeamMember={handlingTeamMember}
            />
          )}
        />
      </View>
      <Card containerStyle={styles.card} title="TEAM MEMBERS">
        <FlatList
          data={teamMember}
          keyExtractor={(item) => item.user}
          renderItem={({ item }) => (
            <Profiles 
              teamLeader={teamMember[0].username} 
              item={[item]} 
              remove={true}
              removeTeamMember={removeTeamMember}
            />
          )}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card:{
    margin: 0,
  }, 
});

export default EventRegistration;

// dispatch(
//   eventRegistration({
//     registerinfo: {
//       email: userProfile.email,
//       name: userProfile.name,
//       contact: userProfile.contact,
//     },
//     eventdetails,
//     eventId: _id,
//     usereventId: userProfile.user,
//     teamsize,
//   })
// )
