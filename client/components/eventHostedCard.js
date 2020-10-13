import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Avatar, Icon, Text } from "react-native-elements";
import { gameImage } from "../shared/gameImage";

const EventHostedCard = ({ item, navigation, type }) => {

  const [imageUri, setImageUri] = useState("sd");
  
  useEffect(() => {
    if (item.game === "PUBG") {
      setImageUri(gameImage.pubg.uri);
    } else if (item.game === "COD") {
      setImageUri(gameImage.cod.uri);
    } else {
      setImageUri(gameImage.clashRoyale.uri);
    }
  }, []);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => {
          console.log(type);
          navigation.navigate("EventDetailsProfile", {
            eventdetails: item,
            imageUri,
            viewingProfile: type === "ProfileEventHostedCard" ? false : true,
            showhostBy: false,
          });
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <Avatar
              size={50}
              rounded
              overlayContainerStyle={{ backgroundColor: "black" }}
              source={imageUri}
              // icon={{ name: "calendar-week", type: "font-awesome-5" }}
            />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    marginBottom: 5,
    backgroundColor: "#232931",
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#4ecca3",
  },
  title: {
    alignSelf: "center",
    fontSize: 16,
    marginHorizontal: 10,
    fontWeight: "bold",
  },
  icon: {
    alignContent: "center",
  },
});

export default EventHostedCard;
