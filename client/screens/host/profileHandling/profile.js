import React, { useState, useEffect } from "react";
import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { Avatar, Button, Text } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../shared/loading";
import { getCurrentProfile, getHostCurrentProfile } from "../../../Redux/actions/profile";
import { loading } from "../../../Redux/actions/loading";

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
    dispatch(getHostCurrentProfile());
  },[])

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <View style={{ flexDirection: "column" }}>
          <View
            style={{
              height: 80,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#839690",
            }}
          ></View>
          <Avatar
            size={80}
            rounded
            overlayContainerStyle={{ backgroundColor: "black" }}
            icon={{ name: "user", type: "font-awesome-5", color:'#fff' }}
            activeOpacity={1}
            containerStyle={{
              position: "absolute",
              marginTop: 40,
              marginHorizontal: 140,
            }}
          />
          <View style={{ position: "relative", paddingTop:40 }}>
          <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 15, color: '#95bdb5' }}>({' '}{username ? username : ''}{' '})</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 20 }}>{name}</Text>
            </View>
            <Text
              style={{ fontSize: 14, color: "gray", textAlign:'center' }}
            >
              About:{" "}
              <Text style={{ fontSize: 15, color: '#95bdb5' }}>
                {bio ? bio : "Please fill this pepole want to know about you"}
              </Text>
            </Text>
          </View>
          <View style={{ flexDirection: "column", top: "3%" }}>
            <View
              style={{ marginVertical: 5, width: "20%", alignSelf: "center" }}
            >
              <Button title="Edit" buttonStyle={{marginBottom: 10}} onPress={handleEdit} />
            </View>
          </View>
        </View>
      </>
    );
  }
};


export default Profile;
