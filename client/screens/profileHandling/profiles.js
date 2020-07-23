import React from 'react';
import { View, TouchableOpacity, Button } from 'react-native';
import { Text, Avatar } from 'react-native-elements';
import ProfileTabView from './tabView';

const Profiles = ({ item, adding, handlingteammember }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate('Userprofile', {
          //   particularuser: item[0],
          // });
          console.log("U can't see his profile i havent implemente that");
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
            containerStyle={{ margin: 5 }}
          />
        </View>
        <View style={{ margin: 3 }}>
          <Text style={{ fontSize: 16 }}>{item[0].name}{" "}</Text>
          <Text style={{color: 'grey'}}>{item[0].username}</Text>
        </View>
        {adding && (
          <TouchableOpacity
            style={{
              alignItems: 'center',
              backgroundColor: '#DDDDDD',
              padding: 2,
            }}
            onPress={() => {
              handlingteammember(item[0]);
            }}
          >
            <Text>Add</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Profiles;
