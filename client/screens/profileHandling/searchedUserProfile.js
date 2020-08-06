import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';
import Loading from '../../shared/loading';
import SearchedUsertabView from './searchedUsertabView';

const SearchedUserProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const particularuser = useSelector((state) => state.profile.particularUser);
  
  if (!particularuser) {
    return <Loading />;
  } else {
    return (
      <>
        <View style={{ flexDirection: 'column' }}>
          <View
            style={{
              height: 80,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#839690',
            }}
          ></View>
          <Avatar
            size={80}
            rounded
            overlayContainerStyle={{ backgroundColor: 'black' }}
            icon={{ name: 'user', type: 'font-awesome-5' }}
            activeOpacity={1}
            containerStyle={{
              position: 'absolute',
              marginTop: 40,
              marginHorizontal: 140,
            }}
          />
          <View style={{ position: 'relative', paddingTop: 40 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 15, color: 'grey' }}>
                ( {particularuser.username ? particularuser.username : ''} )
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 20 }}>{particularuser.name}</Text>
            </View>
            <Text
              style={{ fontSize: 12, color: '#000000', textAlign: 'center' }}
            >
              About:{' '}
              <Text style={{ fontSize: 15, color: '#888888' }}>
                {particularuser.bio
                  ? particularuser.bio
                  : 'Please fill this pepole want to know about you'}
              </Text>
            </Text>
          </View>
          <View style={{ flexDirection: 'column', top: '3%' }}>
            <View
              style={{ marginVertical: 5, width: '20%', alignSelf: 'center' }}
            ></View>
          </View>
        </View>
        <SearchedUsertabView />
      </>
    );
  }
};

export default SearchedUserProfile;

const styles = StyleSheet.create({});
