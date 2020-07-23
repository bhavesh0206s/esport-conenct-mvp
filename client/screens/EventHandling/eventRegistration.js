import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {Icon, Text, Input, Button , Card} from 'react-native-elements'
import Profiles from '../profileHandling/profiles';
import { getProfiles } from '../../Redux/actions/profile';
import { CLEAR_PROFILES } from '../../Redux/actions/types';
import { useDispatch, useSelector } from 'react-redux';

const EventRegistration = ({ route }) => {
  const dispatch = useDispatch();
  const { eventdetails, userProfile } = route.params
  const usersprofiles = useSelector((state) => state.profile.profiles);
  const [inputsearch, setInputSearch] = useState('');
  const [showCancelBtn, setShowCancelBtn] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [teammember, setTeamMember] = useState([
    {
      user: userProfile.user,
      email: userProfile.email,
      name: userProfile.name,
      username: userProfile.username,
      contact: userProfile.contact,
    },
  ]);

  console.log(usersprofiles);

  const handlingteammember = (memberDetail) => {
    let newTeamMemberList = [...teammember, memberDetail];
    setTeamMember(newTeamMemberList);
  };

  return (
    <View>
      <View>
        <FlatList
          data={usersprofiles}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Profiles
              item={[item]}
              adding={true}
              handlingteammember={handlingteammember}
            />
          )}
        />
      </View>
      <Card containerStyle={styles.card} title="TEAM MEMBERS">
        <FlatList
          data={teammember}
          keyExtractor={(item) => item.user}
          renderItem={({ item }) => <Profiles item={[item]} adding={false} />}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card:{
    margin: 0,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  searchIcon: {
    marginRight: 50,
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
