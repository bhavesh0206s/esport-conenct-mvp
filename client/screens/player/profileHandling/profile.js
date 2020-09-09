import React, { useState, useEffect } from "react";
import {View, StyleSheet,ImageBackground } from "react-native";
import { Avatar, Button, Text } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../shared/loading";
import { getCurrentProfile } from "../../../Redux/actions/profile";
import ProfileTabView from "./tabView";
import { loading } from "../../../Redux/actions/loading";
import { AntDesign } from '@expo/vector-icons';

const Profile = ({ navigation }) => {

  const dispatch = useDispatch();
  const {userProfileInfo,loading} = useSelector((state) => ({
    userProfileInfo: state.profile.userProfile,
    loading: state.loading
  }));
  const {
    bio,
    name,
    myevents,
    username,
  } = userProfileInfo;

  // Setting the visibility of Modal

  const handleEdit = () => {
    navigation.navigate('EditProfile')
  }

  useEffect(() => {
    navigation.setParams({title: 'Profile'})
    dispatch(getCurrentProfile());
  },[])

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <View style={styles.container}>
          <ImageBackground 
            source={require('../../../assets/coverProfile.jpg')} 
            style={styles.image} 
          >
            <View style={styles.content}>
              <View style={styles.edit}>
                <Button 
                  icon={<AntDesign name="edit" size={24} color="white" />}
                  buttonStyle={{marginBottom: 10, paddingHorizontal: 10}} 
                  onPress={handleEdit} 
                />
              </View>
              <Avatar
                size={80}
                rounded
                overlayContainerStyle={{ backgroundColor: "black" }}
                icon={{ name: "user", type: "font-awesome-5", color:'#fff' }}
                activeOpacity={1}
                containerStyle={styles.avatar}
              />
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 15, color: '#95bdb5' }}>({' '}{username ? username : ''}{' '})</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 25, fontWeight:'bold' }}>{name}</Text>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.about}>
            <Text style={{ fontSize: 14, color: "gray"}}>
              About:{" "}
            </Text>
            <Text style={{ fontSize: 16, color: '#95bdb5' }}>
              {bio ? bio : "Please fill this pepole want to know about you"}
            </Text>
          </View>
        </View>
        <ProfileTabView/>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    height: 220,
  },  
  content:{
    paddingTop: 100,
    backgroundColor:'rgba(40, 59, 53,0.7)',
    paddingBottom: 20, 
    flex: 1 
  },  
  avatar: {
    position: "absolute",
    alignSelf: 'center',
    top: 20
  },
  about:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    
  },
  edit: {
    position:'absolute',
    padding: 10,
    alignSelf: 'flex-end'
  }
});

export default Profile;
