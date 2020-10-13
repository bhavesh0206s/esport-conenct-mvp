import React, { useState, useEffect } from "react";
import CommonEventHostedCard from "../../../components/profilehandling/commoneventHostedcard";
import { gameImage } from "../../../shared/gameImage";

const EventHostedCard = ({ item, navigation, type }) => {
  const [imageUri, setImageUri] = useState("sd");
  useEffect(() => {
    if (item.game === "PUBG") {
      setImageUri(gameImage.pubg.uri);
    } else if (item.game === "COD") {
      setImageUri(gameImage.cod.uri);
    } else {
      setImageUri(gameImage.clashRoyale.uri);
    }
  }, []);
  return (
    <>
      <CommonEventHostedCard
        navigation={navigation}
        type={type}
        item={item}
        imageUri={imageUri}
      />
    </>
  );
};

export default EventHostedCard;
