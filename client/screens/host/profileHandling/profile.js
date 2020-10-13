import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../shared/loading";
import {
  getCurrentProfile,
  getHostCurrentProfile,
} from "../../../Redux/actions/profile";
import { loading } from "../../../Redux/actions/loading";
import CommonProfile from "../../../components/profilehandling/commonprofile";

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userProfileInfo, loading } = useSelector((state) => ({
    userProfileInfo: state.profile.userProfile,
    loading: state.loading,
  }));
  const { bio, name, myevents, username } = userProfileInfo;

  const handleEdit = () => {
    navigation.navigate("EditProfile");
  };

  useEffect(() => {
    navigation.setParams({ title: "Profile" });
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <CommonProfile
          navigation={navigation}
          bio={bio}
          name={name}
          myevents={myevents}
          username={username}
          handleEdit={handleEdit}
        />
      </>
    );
  }
};

export default Profile;
