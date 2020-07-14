import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';

const EventDetailsCard = ({ route }) => {
  const { eventdetails } = route.params;
  const {
    title,
    description,
    game,
    time,
    teamsize,
    prizepool,
    entryfee,
    contact,
  } = eventdetails;
  return (
    <Card title={title} image={require('../../assets/battlefield.jpg')}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>
          Game:<Text>{game}</Text>
        </Text>
        <Text>
          Date&Time:<Text>{time}</Text>
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>
          Teamsize:<Text>{teamsize}</Text>
        </Text>
        <Text>
          Prize:<Text>{prizepool}</Text>
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>
          Entryfee:<Text>{entryfee}</Text>
        </Text>
        <Text>
          Contact:<Text>{contact}</Text>
        </Text>
      </View>
      <Text style={{ fontSize: 20 }}>Description:-</Text>
      <Text style={{ marginBottom: 10 }}>{description}</Text>
    </Card>
  );
};

export default EventDetailsCard;
