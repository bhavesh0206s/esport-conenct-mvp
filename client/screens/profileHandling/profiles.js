import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Avatar, Button } from 'react-native-elements';
import ProfileTabView from './tabView';

const Profiles = ({ item, adding, handlingTeamMember, remove, teamLeader }) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate('Userprofile', {
          //   particularuser: item[0],
          // });
          console.log("U can't see his profile i havent implemented that");
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
      </TouchableOpacity>
        <View>
          {adding && (
            <Button
              title='ADD' 
              onPress={() => {
                handlingTeamMember(item[0]);
              }}
            />
          )}
          {( (remove && (teamLeader !== item[0].username)) && (
            <Button
              title='Remove' 
              onPress={() => {
                console.log(teamLeader, item[0].username)
                // removeTeamMember()
                // handlingteammember(item[0]);
              }}
            />
          ))}
        </View>
    </View>
  );
};

export default Profiles;
