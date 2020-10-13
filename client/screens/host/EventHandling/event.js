import React, { useState, useEffect } from 'react';
import { gameImage } from '../../../shared/gameImage';
import { useDispatch } from 'react-redux';
import { sendToEventCardDetails} from '../../../Redux/actions/details';
import EventCard from '../../../components/eventCard'

const Event = ({ item, navigation }) => {
  const dispatch = useDispatch();
  const [imageUri, setImageUri] = useState('sd');

  const handleSubmit = () => {
    const details = {
      eventdetails: item,
      imageUri,
      viewingProfile: false,
      showhostBy: true,
    }
    navigation.navigate('EventDetailsCard');
    dispatch(sendToEventCardDetails(details, navigation));
  }

  useEffect(() => {
    if (item.game === 'PUBG') {
      setImageUri(gameImage.pubg.uri);
    } else if (item.game === 'COD') {
      setImageUri(gameImage.cod.uri);
    } else {
      setImageUri(gameImage.clashRoyale.uri);
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
