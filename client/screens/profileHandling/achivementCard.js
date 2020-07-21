import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";

const AchivementCard = ({title}) => {
  return (
    <TouchableOpacity>
      <Card
        title={title}
        image={require("../../assets/cod.jpg")}
        marginBottom={10}
        featuredTitle='1st position in xyz'
        containerStyle={{marginBottom: 10}}
      >
        <Text>
          Idhar achivement ka description hoga
        </Text>
      </Card>
    </TouchableOpacity>
  );
};

export default AchivementCard;
