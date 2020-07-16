import React from 'react';
import {TouchableOpacity } from 'react-native';
import { Text, Card} from 'react-native-elements';

const AchivementCard = () => {
  return (
    <TouchableOpacity>
      <Card
        title='Idhar achivement ka title ayega'
        image={require('../../assets/battlefield.jpg')}
      >
        <Text style={{ marginBottom: 10 }}>Idhar achivement ka description hoga</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default AchivementCard;
