import React, { useEffect, useState } from 'react';
import { View,  StyleSheet, ImageBackground } from 'react-native'
import { Card, ListItem, Button, Icon, Avatar, Text } from 'react-native-elements'
import { gameImage } from '../shared/gameImage';

const ReviewCard = ({item}) => {
  const [imageUri, setImageUri] = useState('random');
  useEffect(() => {
    if (item.game === 'PUBG') {
      setImageUri(gameImage.pubg.uri);
    } else if (item.game === 'COD') {
      setImageUri(gameImage.cod.uri);
    } else if (item.game === 'Clash Royale') {
      setImageUri(gameImage.clashRoyale.uri);
    } else{
      setImageUri(gameImage.coc.uri)
    }
  }, []);
  return (
    <Card containerStyle={styles.container} key={item._id}>
      <ImageBackground
        imageStyle={{ borderRadius: 20}} 
        source={imageUri} 
        style={styles.image} 
      >
        <View style={styles.cardView}>
        <View style={styles.header}>
          <Card.Title  style={{ color: "#eeeeee", fontSize: 20, textAlign: 'center'}}>{item.tournamentName}</Card.Title>
          <View style={styles.rating}>
            <Icon
              name='grade'
              size={25}
              color='#4ecca3'
            />
            <Text style={{fontSize: 18, paddingLeft: 5}}>{item.rating} / 5</Text>
          </View>
        </View>
          <View style={styles.reviewer}>
            <Avatar
              size={40}
              rounded
              overlayContainerStyle={{ backgroundColor: "black" }}
              icon={{ name: "user", type: "font-awesome-5", color: "#fff" }}
              activeOpacity={1}
              // containerStyle={styles.avatar}
            />
            <View style={styles.userDetails}>
              <Text style={{fontSize: 18}}>{item.name}</Text>
              <Text style={{fontSize: 15, color: '#95bdb5'}}>{item.username}</Text>
            </View>
          </View>
          <Card.Divider/>
          <Text style={{marginBottom: 10}}>
            {item.reviewText}
          </Text>
        </View>
      </ImageBackground>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    borderColor: "#393e46",
    borderWidth: 0,
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  rating: {
    flexDirection: 'row'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  cardView: {
    padding: 10,
    backgroundColor: "rgba(35, 41, 49, 0.8)",
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#666666",
  },
  reviewer:{
    flexDirection: 'row',
    paddingBottom: 10,
  },
  userDetails: {
    paddingLeft: 10,
  }
})

export default ReviewCard;