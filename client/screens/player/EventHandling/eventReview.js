import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Card, Icon, Button, Avatar } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import ReviewsCard from "../../../components/ReviewsCard";

const EventReview = ({ navigation }) => {
  const dispatch = useDispatch();

  const { eventdetails, userProfile } = route.params;

  const [eventreviews, setEventReviews] = useState(eventdetails.reviews);

  const { email, name, username, user } = userProfile;

  const [text, setText] = useState("");

  const textHandler = (e) => {
    setText(e.target.value);
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
      />
    );
  }
};

export default EventReview;

// const handleOnPressPostReview = () => {
//   dispatch(
//     PostReview({
//       reviewInfo: {
//         name: userProfile.name,
//         username: userProfile.username,
//         email: userProfile.email,
//         user: userProfile.user,
//         text: "acha tournament karvate ho bhaiya",
//       },
//       eventdetails,
//     })
//   );
//   setEventReviews([
//     ...eventreviews,
//     {
//       name: userProfile.name,
//       username: userProfile.username,
//       email: userProfile.email,
//       user: userProfile.user,
//       text: "acha tournament karvate ho bhaiya",
//     },
//   ]);
// };
