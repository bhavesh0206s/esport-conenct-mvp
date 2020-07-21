import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Avatar } from 'react-native-elements';
import ProfileTabView from './tabView';

const Profiles = ({ item, navigation }) => {
  return (
    <View
      style={{
        backgroundColor: 'rgb(255, 140, 140)',
        flex: 1,
        borderWidth: 1,
        borderColor: 'yellow',
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Userprofile', {
            particularuser: item[0],
          });
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View style={{}}>
          <Avatar
            size={35}
            rounded
            overlayContainerStyle={{ backgroundColor: 'black' }}
            icon={{ name: 'user', type: 'font-awesome-5' }}
            activeOpacity={1}
            containerStyle={{margin: 5}}
          />
        </View>
        <View style={{ margin: 3 }}>
          <Text style={{ fontSize: 16 }}>{item[0].name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Profiles;
