import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Avatar } from 'react-native-elements';

const SearchedUserProfile = ({ navigation, route }) => {
  const { particularuser } = route.params;

  const { followers, following, bio, name, myevents } = particularuser;

  return (
    <View
      style={{
        padding: 10,
        borderColor: 'coral',
        borderWidth: 2,
        height: '100%',
      }}
    >
      <View
        style={{
          height: '12%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgb(249, 117, 117)',
        }}
      ></View>
      <Avatar
        size={60}
        rounded
        overlayContainerStyle={{ backgroundColor: 'black' }}
        icon={{ name: 'user', type: 'font-awesome-5' }}
        onPress={() => console.log('Works!')}
        activeOpacity={1}
        containerStyle={{
          position: 'absolute',
          top: '6%',
          left: '44%',
        }}
      />
      <View style={{ position: 'relative', top: '5%' }}>
        <View style={{ alignItems: 'center' }}>
          <Text>{name}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>
            Followers:<Text>{followers ? followers.length : 0}</Text>
          </Text>
          <Text>
            Following:<Text>{following ? following.length : 0}</Text>
          </Text>
        </View>
        {bio > 0 && <Text>About:{bio}</Text>}
      </View>
    </View>
  );
};

export default SearchedUserProfile;

const styles = StyleSheet.create({});
