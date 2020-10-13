import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../shared/loading";
import ConfirmModal from "../../../shared/confirmModal";
import { deleteHostedEvent } from "../../../Redux/actions/event";
import EventDetailsCard from "../../../components/eventDetailsCard";

const EventDetails = ({ navigation }) => {
  const dispatch = useDispatch();
  const { hostProfile, loading, eventInfo } = useSelector((state) => ({
    hostProfile: state.profile.userProfile,
    loading: state.loading,
    eventInfo: state.details,
  }));
  console.log(eventInfo);
  const { eventdetails, imageUri, viewingProfile, showhostBy } = eventInfo;
  const [eventTime, setEventTime] = useState(
    moment(eventdetails.time).format("dddd, MMMM Do YYYY, h:mm:ss a")
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const {
    title,
    description,
    game,
    teamsize,
    prizepool,
    entryFee,
    contact,
  } = eventdetails;

  const handleRegistration = () => {
    setModalOpen(false);
    navigation.navigate("Event");
  };

  const handleHostEventRemove = () => {
    let hostedBy = hostProfile.username;
    console.log(hostedBy);
    dispatch(deleteHostedEvent(eventdetails, hostedBy));
    navigation.navigate("Home");
  };

  useEffect(() => {
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
    isHost: false,
    btnTitle: 'REMOVE',
    btnStyle: {backgroundColor: '#d9534f'},
  }

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  } else {
    return (
      <ScrollView>
        <ConfirmModal
          text="Are You Sure?"
          setModalOpen={setRemoveModalOpen}
          modalOpen={removeModalOpen}
          handleOk={handleHostEventRemove}
        />
        <EventDetailsCard 
          {...props}
          handleOnPress={() => setRemoveModalOpen(true)}
        />
      </ScrollView>
    );
  }
};

export default EventDetails;
