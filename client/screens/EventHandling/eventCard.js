import React, { useState, useEffect} from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, Card, Button, Icon, Image } from 'react-native-elements';
import { gameImage } from '../../shared/gameImage';

const EventCard = ({ item, navigation }) => {

  const [imageUri, setImageUri] = useState('sd');

  useEffect(() => {
    if(item[0].game === 'PUBG'){
      setImageUri(gameImage.pubg.uri)
    }else if(item[0].game === 'COD'){
      setImageUri(gameImage.cod.uri)
    }else{
      setImageUri(gameImage.clashRoyale.uri)
    }
  }, [])

  return (
    <TouchableOpacity  
    >
      <Card
        title={item[0].title}
        image={imageUri}
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
          onPress={() => {
            console.log(item[0]);
            navigation.navigate('EventDetailsCard', {
              eventdetails: item[0],
              imageUri
            });
          }}
          title="DETAILS"
        />
      </Card>
    </TouchableOpacity>
  );
};

export default EventCard;
