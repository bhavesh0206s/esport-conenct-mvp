import React, { useState, useEffect } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Avatar, Button, Text } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../shared/loading";
import { getCurrentProfile } from "../../../Redux/actions/profile";
import ProfileTabView from "./tabView";
import { loading } from "../../../Redux/actions/loading";
import { AntDesign } from "@expo/vector-icons";
import CommonProfile from "../../../components/profilehandling/commonprofile";

const Profile = ({ navigation }) => {
  useEffect(() => {
    navigation.setParams({ title: "Profile" });
  }, []);

  return (
    <>
      <CommonProfile navigation={navigation} />
      <ProfileTabView />
    </>
  );
};

export default Profile;
