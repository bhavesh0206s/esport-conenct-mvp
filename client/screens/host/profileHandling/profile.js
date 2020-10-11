import React, { useState, useEffect } from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { Avatar, Button, Text } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../shared/loading";
import {
  getCurrentProfile,
  getHostCurrentProfile,
} from "../../../Redux/actions/profile";
import { loading } from "../../../Redux/actions/loading";
import { AntDesign } from "@expo/vector-icons";
import CommonProfile from "../../../components/profilehandling/commonprofile";

const Profile = ({ navigation }) => {
  // Setting the visibility of Modal

  useEffect(() => {
    navigation.setParams({ title: "Profile" });
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <CommonProfile navigation={navigation} />
      </>
    );
  }
};

export default Profile;
