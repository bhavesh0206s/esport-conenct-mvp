import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { FontDisplay } from "expo-font";

const EventDetailsCard = ({ route }) => {
  const { eventdetails } = route.params;
  useEffect(() =>{
    console.log(eventdetails)
  },[])
  const {
    title,
    description,
    game,
    time,
    teamsize,
    prizepool,
    entryFee,
    contact,
  } = eventdetails;
  return (
    <ScrollView>
      <Card
        title={title}
        image={require("../../assets/battlefield.jpg")}
        titleStyle={{ fontSize: 20 }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-around", marginVertical:10 }}>
          <View
            style={{ flexDirection: "column", justifyContent: "space-between" }}
          >
            <Text>
              Game: <Text>{game}</Text>
            </Text>
            <Text>
              Teamsize: <Text>{teamsize}</Text>
            </Text>
            <Text>
              Entryfee: <Text>{entryFee}</Text>
            </Text>
            
          </View>
          <View
            style={{ flexDirection: "column", justifyContent: "space-between" }}
          >
            <Text>
              Date&Time: <Text>{time}</Text>
            </Text>
            <Text>
              Teamsize: <Text>{teamsize}</Text>
            </Text>
            <Text>
              Contact: <Text>{contact}</Text>
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 20 }}>Description:-</Text>
        <Text style={{ marginBottom: 10 }}>{description}</Text>
        <Button
          icon={<Icon name="code" color="#ffffff" />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          onPress={() => {
            console.log("Iska Registration karo koi");
          }}
          title="Registration"
        />
      </Card>
    </ScrollView>
  );
};

export default EventDetailsCard;
