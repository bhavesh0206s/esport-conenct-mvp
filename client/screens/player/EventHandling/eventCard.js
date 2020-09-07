import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Text, Card, Button, Icon, Image } from 'react-native-elements';
import { gameImage } from '../../../shared/gameImage';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMyEvent } from '../../../Redux/actions/event';

const EventCard = ({ item, navigation }) => {
  const [imageUri, setImageUri] = useState('sd');
  const dispatch = useDispatch();

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
      </Card>
      <View>
        <Button
          icon={<Icon name="description" color="#ffffff" />}
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          onPress={() => {
            navigation.navigate('EventDetailsCard', {
              eventdetails: item,
              imageUri,
              viewingProfile: false,
              showhostBy: true,
            });
          }}
          title="DETAILS"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 8,
    // marginBottom: 10
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cardImage: {
    borderRadius: 20,
    margin: 10
  },
  mainTitle: {
    fontSize: 25,
  },
  btnStyle: {
    borderRadius: 0,
    marginBottom: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  btnStyleDelete: {
    backgroundColor: 'red',
    borderRadius: 0,
    marginBottom: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  fieldView: {
    borderBottomWidth: 1,
    borderColor: '#dbdbdb',
  },
  fieldTitle: {
    color: 'grey',
  },
  field: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#666666',
  },
});

export default EventCard;
