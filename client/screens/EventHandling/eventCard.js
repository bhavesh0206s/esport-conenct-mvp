import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { Text, Card, Button, Icon, Image } from "react-native-elements";
import { gameImage } from "../../shared/gameImage";
import moment from 'moment';
import { useSelector } from "react-redux";

const EventCard = ({ item, navigation }) => {
  const [imageUri, setImageUri] = useState("sd");
  
  useEffect(() => {
    if (item[0].game === "PUBG") {
      setImageUri(gameImage.pubg.uri);
    } else if (item[0].game === "COD") {
      setImageUri(gameImage.cod.uri);
    } else {
      setImageUri(gameImage.clashRoyale.uri);
    }
  }, []);

  return (
    <TouchableOpacity  style={styles.container} >
      <Card title={item[0].title} image={imageUri}>
      <View style={styles.content}>
          <View
            style={{ flexDirection: "column" }}
          >
            <Text>
              Game: <Text>{item[0].game}</Text>
            </Text>
            <Text>
              Entryfee: <Text>{item[0].entryFee}</Text>
            </Text>
            <Text>
              Date&Time: <Text>{moment(item[0].time).format("Do MMMM YYYY, h:mm a")}</Text>
            </Text>
          </View>
          <View
            style={{ flexDirection: "column" }}
          >
            <Text>
              Teamsize: <Text>{item[0].teamsize}</Text>
            </Text>
            <Text>
              Prize-pool: <Text>{item[0].prizepool}</Text>
            </Text>
          </View>
          
        </View>
        <Button
          icon={<Icon name="description" color="#ffffff" />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          onPress={() => {
            navigation.navigate("EventDetailsCard", {
              eventdetails: item[0],
              imageUri,
            });
            console.log(item[0])
          }}
          title="DETAILS"
        />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  content :{
    flexDirection: "row", 
    justifyContent: "space-around", 
    marginVertical:5,
    marginHorizontal: 19 
  }
})

export default EventCard;
