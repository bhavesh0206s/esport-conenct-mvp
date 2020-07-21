import React, { useState } from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import Profiles from '../profileHandling/profiles';

const EventRegistration = ({ eventdetails, setModalOpen, userProfile }) => {
  const dispatch = useDispatch();
  const usersprofiles = useSelector((state) => state.profile.profiles);
  const [inputsearch, setInputSearch] = useState('');
  const [showCancelBtn, setShowCancelBtn] = useState(false);
  const [addmember, setAddmember] = useState([
    {
      user: userProfile.user,
      email: userProfile.email,
      name: userProfile.name,
      contact: userProfile.contact,
    },
  ]);

  const handleCancel = () => {
    setInputSearch('');
    // dispatch({ type: CLEARSEARCHEDEVENTS });
    setShowCancelBtn(false);
  };

  return (
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
          placeholder="Search..."
          onChangeText={(val) => {
            setInputSearch(val);
            dispatch(getEvents(val));
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
      <View>
        <Text>Your Team</Text>
      </View>
      <FlatList
        data={usersprofiles}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Profiles item={[item]} navigation={navigation} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 4,
    borderBottomWidth: 0.7,
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
