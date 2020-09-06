import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";

const AchivementCard = ({title}) => {
  return (
    <TouchableOpacity>
      <Card containerStyle={{marginBottom: 10}} >
        <Card.Title >{title}</Card.Title>
        <Card.Image source={require("../../../assets/cod.jpg")} />
        <Text>
          Idhar achivement ka description hoga
        </Text>
      </Card>
    </TouchableOpacity>
  );
};

export default AchivementCard;
