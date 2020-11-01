import React, { useState } from "react";
import { StyleSheet, View, FlatList, Modal } from "react-native";
import { Card, Icon, Button, Avatar } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import ReviewsCard from "../../../components/ReviewsCard";
import { eventRegistration, PostReview } from "../../../Redux/actions/event";

const EventReview = ({ navigation }) => {
  const dispatch = useDispatch();

  const [reviewPosted, setReviewPosted] = useState("");

  const { eventdetails, userProfile } = route.params;

  const [eventreviews, setEventReviews] = useState(eventdetails.reviews);

  const { email, name, username, user } = userProfile;

  const [text, setText] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let arr = eventreviews.filter((review) => {
      return review.user === user;
    });
    if (arr.length > 0) {
      setReviewPosted(arr[0].text);
    }
  }, [eventreviews]);

  const reviewHandler = (myReview) => {
    dispatch(
      PostReview({
        reviewInfo: {
          name,
          username,
          email,
          user,
          text: myReview,
        },
        eventdetails,
      })
    );
    setEventReviews([
      ...eventreviews,
      {
        name,
        username,
        email,
        user,
        text: myReview,
      },
    ]);
    setText("");
  };

  const textHandler = (e) => {
    setText(e.target.value);
  };

  const modalHandler = () => {
    setModalOpen(!modalOpen);
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <ReviewsCard
        title={eventdetails.title}
        eventreviews={eventreviews}
        text={text}
        textHandler={textHandler}
        reviewHandler={reviewHandler}
        reviewPosted={reviewPosted}
        modalOpen={modalOpen}
        modalHandler={modalHandler}
      />
    );
  }
};

export default EventReview;
