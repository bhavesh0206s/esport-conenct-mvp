import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Avatar, Button, Text } from "react-native-elements";
import { loading } from "../Redux/actions/loading";
import { AntDesign } from "@expo/vector-icons";

const CommonProfile = ({ navigation, bio, username, myevents, name }) => {
  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/coverProfile.jpg")}
          style={styles.image}
        >
          <View style={styles.content}>
            <View style={styles.edit}>
              <Button
                icon={<AntDesign name="edit" size={24} color="white" />}
                buttonStyle={{ marginBottom: 10, paddingHorizontal: 10 }}
                onPress={
                  console.log("pressed")
                  // handleEdit
                }
              />
            </View>
            <Avatar
              size={80}
              rounded
              overlayContainerStyle={{ backgroundColor: "black" }}
              icon={{ name: "user", type: "font-awesome-5", color: "#fff" }}
              activeOpacity={1}
              containerStyle={styles.avatar}
            />
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 15, color: "#95bdb5" }}>
                ( {username ? username : ""} )
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>{name}</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.about}>
          <Text style={{ fontSize: 14, color: "gray" }}>About: </Text>
          <Text style={{ fontSize: 16, color: "#95bdb5" }}>
            {bio ? bio : "Please fill this pepole want to know about you"}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 220,
  },
  content: {
    paddingTop: 100,
    backgroundColor: "rgba(40, 59, 53,0.7)",
    paddingBottom: 20,
    flex: 1,
  },
  avatar: {
    position: "absolute",
    alignSelf: "center",
    top: 20,
  },
  about: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  edit: {
    position: "absolute",
    padding: 10,
    alignSelf: "flex-end",
  },
});

export default CommonProfile;
