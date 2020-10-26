import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Avatar, Button, Text } from "react-native-elements";
import SearchedHostTabView from "../screens/player/profileHandling/searchedHostTabView";
import SearchedUserTabView from "../screens/player/profileHandling/searchedUsertabView";

const SearchedProfile = ({ isHostProfile, particularUser }) => {
  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/coverProfile.jpg")}
          style={styles.image}
        >
          <View style={styles.content}>
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
                ( {particularUser.username ? particularUser.username : ""} )
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                {particularUser.name}
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.about}>
          <Text style={{ fontSize: 14, color: "gray" }}>About: </Text>
          <Text style={{ fontSize: 16, color: "#95bdb5" }}>
            {particularUser.bio
              ? particularUser.bio
              : "Please fill this pepole want to know about you"}
          </Text>
        </View>
      </View>
      {isHostProfile ? <SearchedHostTabView /> : <SearchedUserTabView />}
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

export default SearchedProfile;
