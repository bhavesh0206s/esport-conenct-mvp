import React, { useState } from 'react';
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  FlatList,
  Icon,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Profiles from '../profileHandling/profiles';
import { getProfiles } from '../../Redux/actions/profile';
import { CLEAR_PROFILES } from '../../Redux/actions/types';
import { useDispatch, useSelector } from 'react-redux';

const EventRegistration = ({ route }) => {
  const dispatch = useDispatch();
  const { eventdetails, navigation, userProfile } = route.params
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

  const handleCancel = () => {
    setInputSearch('');
    // dispatch({ type: CLEAR_PROFILES });
    setShowCancelBtn(false);
  };

  const handlingteammember = (memberdetail) => {
    let newTeamMemberList = [...teammember, memberdetail];
    setTeamMember(newTeamMemberList);
  };

  return (
    <View>
      <View>
        <Text>Your Team</Text>
        <FlatList
          data={teammember}
          keyExtractor={(item) => item.user}
          renderItem={({ item }) => <Profiles item={[item]} adding={false} />}
        />
      </View>
      {!showSearchBar ? (
        <Button
          title="Add other team members"
          onPress={() => setShowSearchBar(true)}
        />
      ) : teammember.length === eventdetails.teamsize ? (
        <Button
          title="Register"
          onPress={() => {
            setShowSearchBar(true);
            modalHandling();
            console.log(teammember);
          }}
        />
      ) : (
        <View>
          <View style={styles.searchSection}>
            <AntDesign
              name="search1"
              style={styles.searchIcon}
              size={24}
              color="black"
            />
            <TextInput
              style={styles.input}
              placeholder="Search players and build up your team"
              onChangeText={(val) => {
                setInputSearch(val);
                dispatch(getProfiles(val));
                if (inputsearch.length > 0) {
                  setShowCancelBtn(true);
                }
              }}
              value={inputsearch}
            />
            {showCancelBtn && (
              <Icon
                onPress={handleCancel}
                name="clear"
                style={styles.searchIcon}
                size={24}
                color="black"
              />
            )}
          </View>
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  searchIcon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 4,
    borderBottomWidth: 0.7,
    marginTop: 10
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
