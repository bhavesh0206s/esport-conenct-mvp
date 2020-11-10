import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../shared/loading";
import HostProfileDetails from "../../../components/hostProfileDetails";
import { getReviews } from "../../../Redux/actions/review";
import HostProfileTabView from "./tabView";

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userProfileInfo, loading, hostReviews } = useSelector((state) => ({
    userProfileInfo: state.profile.userProfile,
    loading: state.loading,
    hostReviews: state.reviews
  }));

  const [averageRating, setAverageRating] = useState(0);
  const { bio, name, myevents, username } = userProfileInfo;

  const handleEdit = () => {
    navigation.navigate("EditProfile");
  };

  useEffect(() => {
    dispatch(getReviews(userProfileInfo.user))
    navigation.setParams({ title: "Profile" });
  }, []);

  
  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <HostProfileDetails
          navigation={navigation}
          bio={bio}
          name={name}
          myevents={myevents}
          username={username}
          handleEdit={handleEdit}
        />
        <HostProfileTabView hostReviews={hostReviews} averageRating={averageRating}/>
      </>
    );
  }
};

export default Profile;
