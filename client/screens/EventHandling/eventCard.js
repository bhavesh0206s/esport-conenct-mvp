import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';

const EventCard = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(item[0]);
        navigation.navigate('EventDetailsCard', {
          eventdetails: item[0],
        });
      }}
    >
      <Card
        title={item[0].title}
        image={require('../../assets/battlefield.jpg')}
      >
        <Text style={{ marginBottom: 10 }}>{item[0].description}</Text>
        <Button
          icon={<Icon name="code" color="#ffffff" />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="DETAILS"
        />
      </Card>
    </TouchableOpacity>
  );
};

export default EventCard;
