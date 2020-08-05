import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { Avatar, Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import EditProfile from "./editProfile";
import Modal from "react-native-modal";
import { ScrollView } from "react-native-gesture-handler";
import Loading from "../../shared/loading";
import { getCurrentProfile } from "../../Redux/actions/profile";
import ProfileTabView from "./tabView";
import { loading } from "../../Redux/actions/loading";

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
    dispatch(getCurrentProfile())
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
            icon={{ name: "user", type: "font-awesome-5" }}
            activeOpacity={1}
            containerStyle={{
              position: "absolute",
              marginTop: 40,
              marginHorizontal: 140,
            }}
          />
          <View style={{ position: "relative", paddingTop:40 }}>
          <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 15, color: 'grey' }}>({' '}{username ? username : ''}{' '})</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 20 }}>{name}</Text>
            </View>
            <Text
              style={{ fontSize: 12, color: "#000000", textAlign:'center' }}
            >
              About:{" "}
              <Text style={{ fontSize: 15, color: "#888888" }}>
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
        <ProfileTabView/>
      </>
    );
  }
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "white",
    margin: 0, // This is the important style you need to set
  },
});

export default Profile;
