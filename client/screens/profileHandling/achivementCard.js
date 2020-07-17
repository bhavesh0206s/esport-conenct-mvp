import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";

const AchivementCard = () => {
  return (
    <TouchableOpacity>
      <Card
        title="Idhar achivement ka title ayega"
        image={require("../../assets/battlefield.jpg")}
        marginBottom={10}
        featuredTitle='1st position in xyz'
      >
        <Text>
          Idhar achivement ka description hoga
        </Text>
      </Card>
    </TouchableOpacity>
  );
};

export default AchivementCard;
