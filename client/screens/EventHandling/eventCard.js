import React from 'react';
import { View } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';

const EventCard = ({ item }) => {
  return (
    <Card
      title={item[0].title}
      image={require('../../assets/battlefield.jpg')}
    >
      <Text style={{marginBottom: 10}}>
        {item[0].description}
      </Text>
      <Button
        icon={<Icon name='code' color='#ffffff' />}
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title='DETAILS' />
    </Card>
  );
};

export default EventCard;