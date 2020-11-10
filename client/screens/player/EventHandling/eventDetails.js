import React, { useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHostProfileById } from "../../../Redux/actions/profile";
import { eventRegistration, PostReview } from "../../../Redux/actions/event";
import Loading from "../../../shared/loading";
import { CLEARPARTICULARUSER } from "../../../Redux/actions/types";
import ConfirmModal from "../../../shared/confirmModal";
import EventDetailsCard from "../../../components/eventDetailsCard";
import { getReviews } from "../../../Redux/actions/review";

const EventDetails = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { userProfile, hostProfile, reviews, loading } = useSelector((state) => ({
    userProfile: state.profile.userProfile,
    hostProfile: state.profile.particularUser,
    reviews: state.reviews,
    loading: state.loading,
  }));
  const [eventId] = useState(userProfile.myevents.map((item) => item._id));
  
  const { eventdetails, imageUri, viewingProfile, showhostBy } = route.params;
  const [eventTime, setEventTime] = useState(
    moment(eventdetails.time).format("dddd, MMMM Do YYYY, h:mm:ss a")
  );

  const [modalOpen, setModalOpen] = useState(false);

  const {
    title,
    description,
    game,
    teamsize,
    prizepool,
    entryFee,
    contact,
    hostedBy,
    _id,
    user,
    hostedById,
  } = eventdetails;

  const handleRegistration = () => {
    dispatch(
      eventRegistration({
        registerinfo: {
          email: userProfile.email,
          name: userProfile.name,
          contact: userProfile.contact,
          username: userProfile.username,
          user: userProfile.user,
        },
        eventdetails,
        eventId: _id,
        usereventId: user,
        teamsize,
      })
    );
    setModalOpen(false);
    navigation.navigate("Event");
  };

  const handleSubmit = () => {
    if (userProfile.email === hostProfile.email) {
      alert("Host of the Event, can't Register!");
    } else if (eventId.indexOf(_id) !== -1) {
      alert("Already Registered!!");
    } else if (userProfile.gameIds[game] === "") {
      alert(`Your ${game} Id is not provided`);
    } else if (teamsize === 1) {
      setModalOpen(true);
    } else {
      navigation.navigate("Register", {
        navigation,
        eventdetails,
        userProfile,
      });
    }
  };

  const showHostProfile = () => {
    dispatch({ type: CLEARPARTICULARUSER });
    dispatch(getHostProfileById(hostedById, navigation));
    navigation.navigate("Userprofile", { isHostProfile: true });
  };

  const renderHostDetails = () => {
    return (
      <>
        {showhostBy && (
          <View>
            <Text style={{ color: "#95bdb5" }}>Hosted by: </Text>
            <TouchableOpacity onPress={showHostProfile}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 18 }}>{hostProfile.name} </Text>
                <Text style={{ color: "#95bdb5", fontSize: 18 }}>
                  ({hostedBy})
                </Text>
              </View>
              <Text style={{ color: "#4ecca3" }}>View Profile</Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  };

  const renderAvgRating = (styles) =>(
    <>
      <Text style={styles.title}>Host Rating: </Text>
      <View style={{flexDirection: 'row'}}>
        <Icon
          name='grade'
          size={25}
          color='#4ecca3'
        />
        <Text style={{paddingLeft: 5 ,...styles.field}}>{reviews.reduce((a, b) => (a + b.rating), 0) / reviews.length} / 5</Text>
      </View>
    </>
  )
  
  useEffect(() => {
    dispatch(getHostProfileById(hostedById, navigation, false));
    dispatch(getReviews(hostedById))
    navigation.setParams({
      title,
    });
  }, []);

  const props = {
    title,
    description,
    game,
    teamsize,
    prizepool,
    entryFee,
    contact,
    viewingProfile,
    imageUri,
    eventTime,
    isHost: true,
    btnTitle: "REGISTRATION",
  };

  if (loading) {
    return (
      <Loading />
    );
  } else {
    return (
      <ScrollView>
        <ConfirmModal
          text="Complete Registration For Single Player Event!"
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          handleOk={handleRegistration}
        />
        <EventDetailsCard
          {...props}
          renderAvgRating={renderAvgRating}
          handleOnPress={handleSubmit}
          renderHostDetails={renderHostDetails}
        />
      </ScrollView>
    );
  }
};

export default EventDetails;
