import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../shared/loading";
import CommonSearchedProfile from "../../../components/profilehandling/commonsearchedProfile";

const SearchedUserProfile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { particularUser, loading } = useSelector((state) => ({
    particularUser: state.profile.particularUser,
    loading: state.loading,
  }));

  const { isHostProfile } = route.params;

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <CommonSearchedProfile
          particularUser={particularUser}
          isHostProfile={isHostProfile}
        />
      </>
    );
  }
};

export default SearchedUserProfile;
