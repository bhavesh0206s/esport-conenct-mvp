import React, { useState, useEffect } from 'react';
import { gameImage } from '../../../shared/gameImage';
import EventCard from '../../../components/eventCard'

const Event = ({ item, navigation }) => {
  const [imageUri, setImageUri] = useState('sd');

  const handleSubmit = () => {
    navigation.navigate('EventDetails', {
      eventdetails: item,
      imageUri,
      viewingProfile: false,
      showhostBy: true,
    });
  }

  useEffect(() => {
    if (item.game === 'PUBG') {
      setImageUri(gameImage.pubg.uri);
    } else if (item.game === 'COD') {
      setImageUri(gameImage.cod.uri);
    } else if (item.game = 'Clash Royale') {
      setImageUri(gameImage.clashRoyale.uri);
    } else{
      setImageUri(gameImage.coc.uri)
    }
  }, []);

  return (
    <EventCard 
      item={item}
      handleSubmit={handleSubmit}
      imageUri={imageUri}
    />
  );
};

export default Event;
