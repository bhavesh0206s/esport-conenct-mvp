import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";

const EventDetailsCard = ({
  viewingProfile,
  isHost,
  title,
  btnStyle,
  btnTitle,
  imageUri,
  handleOnPress,
  game,
  teamsize,
  entryFee,
  prizepool,
  eventTime,
  contact,
  description,
  renderHostDetails,
  handleOnPressPostReview,
  rating,
}) => {
  return (
    <Card containerStyle={styles.container}>
      <Card.Title style={styles.mainTitle}>{title}</Card.Title>
      <Card.Image source={imageUri} style={styles.cardImage} />
      <View style={styles.cardView}>
        {!viewingProfile && (
          <Button
            icon={<Icon name="form" type="antdesign" color="#ffffff" />}
            buttonStyle={{ ...btnStyle, ...styles.btnStyle }}
            onPress={handleOnPress}
            title={btnTitle}
          />
        )}
        <Button
          icon={<Icon name="form" type="antdesign" color="#ffffff" />}
          buttonStyle={{ ...btnStyle, ...styles.btnStyle }}
          title="PostReview"
          onPress={handleOnPressPostReview}
        />
        <Text style={styles.title}>Game: </Text>
        <Text style={styles.field}>{game}</Text>
        <Text style={styles.title}>Rating: </Text>
        <Text style={styles.field}>{rating}</Text>
        <Text style={styles.title}>Teamsize: </Text>
        <Text style={styles.field}>{teamsize}</Text>
        <Text style={styles.title}>Entryfee: </Text>
        <Text style={styles.field}>{entryFee}</Text>
        <Text style={styles.title}>Prize pool: </Text>
        <Text style={styles.field}>{prizepool}</Text>
        <Text style={styles.title}>Date & Time:</Text>
        <Text style={styles.field}>{eventTime.toString()}</Text>
        <Text style={styles.title}>Contact: </Text>
        <Text style={styles.field}>{contact}</Text>
        <Text style={styles.title}>Description:-</Text>
        <Text style={styles.field}>{description}</Text>
        {isHost && renderHostDetails()}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#95bdb5",
  },
  field: {
    fontSize: 18,
    marginBottom: 10,
  },
  container: {
    margin: 0,
    borderWidth: 0,
    paddingBottom: 20,
  },
  mainTitle: {
    fontSize: 25,
    color: "#eeeeee",
  },
  cardView: {
    paddingHorizontal: 10,
  },
  cardImage: {
    borderRadius: 20,
    margin: 10,
  },
  btnStyle: {
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default EventDetailsCard;
