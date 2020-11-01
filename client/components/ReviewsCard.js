import React, { useState } from "react";
import { StyleSheet, View, FlatList, Modal } from "react-native";
import { Card, Icon, Button, Avatar } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { Input } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

const ReviewsCard = ({
  route,
  navigation,
  title,
  eventreviews,
  text,
  textHandler,
  reviewHandler,
  reviewPosted,
  modalOpen,
  modalHandler,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <Modal visible={modalOpen} animationType="slide">
        <EditMyReview
          modalHandler={modalHandler}
          reviewHandler={reviewHandler}
          reviewPosted={reviewPosted}
        />
      </Modal>
      <View style={{ flex: 1 }}>
        <Text>{title}</Text>
      </View>
      <View style={{ flex: 5 }}>
        <FlatList
          nestedScrollEnabled
          extraData={eventreviews}
          data={eventreviews}
          onEndReachedThreshold={0.5}
          initialNumToRender={6}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
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
                <Text style={{ fontSize: 16 }}>{item.name} </Text>
                <Text style={{ fontSize: 15 }}>{item.username} </Text>
                <Text style={{ color: "#95bdb5", fontSize: 14 }}>
                  {item.text}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
      {reviewPosted === "" ? (
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Avatar
            size={35}
            rounded
            overlayContainerStyle={{ backgroundColor: "black" }}
            icon={{ name: "user", type: "font-awesome-5", color: "#fff" }}
            activeOpacity={1}
            containerStyle={{ flex: 1 }}
          />
          <Input
            placeholder="Enter Review Here"
            value={text}
            onChangeText={(e) => textHandler(e)}
            style={{ flex: 4 }}
          />
          <View style={{ flex: 1 }}>
            <FontAwesome
              name="send"
              size={24}
              color="black"
              onClick={() => {
                reviewHandler(text);
              }}
            />
          </View>
        </View>
      ) : (
        <Button
          icon={<Icon name="form" type="antdesign" color="#ffffff" />}
          onPress={modalHandler}
          title="Edit Your Review"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // card: {
  //   margin: 0,
  //   borderColor: "#393e46",
  //   borderWidth: 0,
  // }
});

export default ReviewsCard;
