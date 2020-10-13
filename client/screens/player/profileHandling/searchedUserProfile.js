import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../shared/loading";
import SearchedProfile from "../../../components/searchedProfile";

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
        <SearchedProfile
          particularUser={particularUser}
          isHostProfile={isHostProfile}
        />
      </>
    );
  }
};

export default SearchedUserProfile;
