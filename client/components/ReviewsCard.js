import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Card, Icon, Button, Avatar } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

const ReviewsCard = ({ route, navigation, title, eventreviews }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text>{title}</Text>
      <View>
        {eventreviews.map((review) => (
          <View style={{ flexDirection: "row" }}>
            <Avatar
              size={35}
              rounded
              overlayContainerStyle={{ backgroundColor: "black" }}
              icon={{ name: "user", type: "font-awesome-5", color: "#fff" }}
              activeOpacity={1}
              // containerStyle={}
            />
            <View
              style={{
                borderColor: "black",
                borderWidth: "1px",
                borderStyle: "solid",
                padding: "5px",
              }}
            >
              <Text style={{ fontSize: 16 }}>{review.name} </Text>
              <Text style={{ fontSize: 15 }}>{review.username} </Text>
              <Text style={{ color: "#95bdb5", fontSize: 14 }}>
                {review.text}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <Avatar
        size={35}
        rounded
        overlayContainerStyle={{ backgroundColor: "black" }}
        icon={{ name: "user", type: "font-awesome-5", color: "#fff" }}
        activeOpacity={1}
        containerStyle={styles.avatar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 0,
    borderColor: "#393e46",
    borderWidth: 0,
  },

  cardView: {
    padding: 10,
    margin: 10,
    marginBottom: 5,
    backgroundColor: "#232931",
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#666666",
  },
});

export default ReviewsCard;
