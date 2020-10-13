import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";

const AchivementCard = ({title}) => {
  return (
    <Card containerStyle={styles.card} >
      <Card.Title style={{color: '#eeeeee'}}>{title}</Card.Title>
      <Card.Image source={require("../assets/cr.jpg")} />
      <Text>
        Idhar achivement ka description hoga
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10, 
    backgroundColor: '#232931', 
    borderWidth: 0,
    borderRadius: 10
  }
})

export default AchivementCard;
