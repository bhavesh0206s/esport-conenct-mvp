import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon, Image } from 'react-native-elements';

const EventCard = ({ item, handleSubmit, imageUri }) => {

  return (
    <>
      <Card containerStyle={styles.container} >
        <Card.Title style={styles.mainTitle}>{item.title}</Card.Title>
        <Card.Image source={imageUri} style={styles.cardImage} />
        <View style={styles.content}>
          <View style={{ flexDirection: 'column' }}>
            <View style={styles.fieldView}>
              <Text style={styles.fieldTitle}>Game: </Text>
              <Text style={styles.field}>{item.game}</Text>
            </View>
            <View style={styles.fieldView}>
              <Text style={styles.fieldTitle}>Entry Fees: </Text>
              <Text style={styles.field}>{item.entryFee}</Text>
            </View>
            <View style={styles.fieldView}>
              <Text style={styles.fieldTitle}>Date & Time: </Text>
              <Text style={styles.field}>
                {moment(item.time).format('Do MMMM YYYY, h:mm a')}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <View style={styles.fieldView}>
              <Text style={styles.fieldTitle}>Teamsize: </Text>
              <Text style={styles.field}>{item.teamsize}</Text>
            </View>
            <View style={styles.fieldView}>
              <Text style={styles.fieldTitle}>Prize-pool: </Text>
              <Text style={styles.field}>{item.prizepool}</Text>
            </View>
          </View>
        </View>
        <View>
          <Button
            icon={<Icon name="description" color="#ffffff" />}
            buttonStyle={styles.btnStyle}
            containerStyle={styles.btnContainer}
            onPress={handleSubmit}
            title="DETAILS"
          />
        </View>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    borderColor: '#393e46',
    padding: 10,
    margin: 10,
    marginBottom: 5,
    borderRadius: 12,
    backgroundColor: '#232931',
    elevation: 4,
    shadowColor: '#4ecca3',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cardImage: {
    borderRadius: 20,
    marginBottom: 10,
  },
  mainTitle: {
    fontSize: 25,
    color: '#eeeeee'
  },
  btnStyle: {
    borderRadius: 0,
    marginTop: 10,
    // marginBottom: 20,
    borderRadius: 5,
  },
  fieldView: {
    borderBottomWidth: 1,
    borderColor: '#dbdbdb',
  },
  fieldTitle: {
    color: '#95bdb5',
  },
  field: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default EventCard;
