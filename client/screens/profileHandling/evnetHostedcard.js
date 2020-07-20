import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { Avatar, Icon } from "react-native-elements";

const EventHostedCard = () => {
  return (
    // <TouchableOpacity>
    //   <Card
    //     title="Idhar achivement ka title ayega"
    //     image={require("../../assets/pubg.jpg")}
    //     marginBottom={10}
    //   >
    //     <Text>Idhar achivement ka description hoga</Text>
    //   </Card>
    // </TouchableOpacity>
    <View style={styles.card}>
      <TouchableOpacity>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <Avatar
              size={50}
              rounded
              overlayContainerStyle={{ backgroundColor: "black" }}
              source={require("../../assets/pubg.jpg")}
              // icon={{ name: "calendar-week", type: "font-awesome-5" }}
              onPress={() => console.log("Works!")}
            />
            <Text style={styles.title}>Event ka Naam </Text>
          </View>
          <Icon name="ellipsis-v" type="font-awesome-5" style={styles.icon} />
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
    backgroundColor: "#eee",
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#666666",
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
