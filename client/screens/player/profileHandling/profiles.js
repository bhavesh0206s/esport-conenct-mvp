import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Avatar, Button, Icon } from 'react-native-elements';
import ProfileTabView from './tabView';

const Profiles = ({ item, adding, handlingTeamMember, remove, teamLeader , removeTeamMember}) => {

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 7, marginHorizontal: 10}}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View>
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
              icon={
                <Icon
                  name="add"
                  size={20}
                  color="white"
                />
              }
              onPress={() => {
                handlingTeamMember(item[0]);
              }}
            />
          )}
          {( (remove && (teamLeader !== item[0].username)) && (
            <Button
              icon={
                <Icon
                  name="remove"
                  size={20}
                  color="white"
                />
              }
              buttonStyle={{backgroundColor: 'red'}}
              onPress={() => {
                removeTeamMember(item[0].username)
              }}
            />
          ))}
        </View>
    </View>
  );
};

export default Profiles;
