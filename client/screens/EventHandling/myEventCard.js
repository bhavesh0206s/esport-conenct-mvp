import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { Text, Card, Button, Icon, Image } from "react-native-elements";
import { gameImage } from "../../shared/gameImage";
import moment from 'moment';
import { useSelector, useDispatch } from "react-redux";
import { deleteMyEvent } from "../../Redux/actions/event";

const MyEventCard = ({ item, navigation, deleteEvent}) => {
  const [imageUri, setImageUri] = useState("sd");
  const currentUserUsername = useSelector(state => state.profile.userProfile.username)
  const dispatch = useDispatch()

  useEffect(() => {
    if (item[0].game === "PUBG") {
      setImageUri(gameImage.pubg.uri);
    } else if (item[0].game === "COD") {
      setImageUri(gameImage.cod.uri);
    } else {
      setImageUri(gameImage.clashRoyale.uri);
    }
  }, []);

  return (
    <>
      <Card 
        titleStyle={styles.mainTitle} 
        title={item[0].title} 
        imageStyle={styles.cardImage} 
        containerStyle={styles.container} 
        image={imageUri}
      >
        <View style={styles.content}>
            <View style={{ flexDirection: "column" }}>
              <View style={styles.fieldView}>
                <Text style={styles.fieldTitle}>Game: </Text>
                <Text style={styles.field}>{item[0].game}</Text>
              </View>
              <View style={styles.fieldView}>
                <Text style={styles.fieldTitle}>Entryfee: </Text>
                <Text style={styles.field}>{item[0].entryFee}</Text>
              </View>
              <View style={styles.fieldView}>
                <Text style={styles.fieldTitle}>Date&Time: </Text>
                <Text style={styles.field}>{moment(item[0].time).format("Do MMMM YYYY, h:mm a")}</Text>
              </View>
            </View>
            <View style={{ flexDirection: "column" }}>
              <View style={styles.fieldView}>
                <Text style={styles.fieldTitle}>Teamsize: </Text>
                <Text style={styles.field}>{item[0].teamsize}</Text>
              </View>
              <View style={styles.fieldView}>
                <Text style={styles.fieldTitle}>Prize-pool: </Text>
                <Text style={styles.field}>{item[0].prizepool}</Text>
              </View>
            </View>
            
          </View>
        </Card>
        <View>
            <Button
              icon={<Icon name="description" color="#ffffff" />}
              buttonStyle={styles.btnStyleDelete}
              onPress={() => {
                dispatch(deleteMyEvent(item[0], currentUserUsername))
              }}
              title="REMOVE"
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
  content :{
    flexDirection: "row", 
    justifyContent: "space-around",
  },
  cardImage: {
    borderRadius: 20
  },
  mainTitle:{
    fontSize: 25
  },
  btnStyle:{
    borderRadius: 0,
    marginBottom: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50
  },
  btnStyleDelete:{
    backgroundColor: 'red',
    borderRadius: 0,
    marginBottom: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50
  },
  fieldView:{
    borderBottomWidth: 1,
    borderColor: "#dbdbdb",
  },
  fieldTitle:{
    color: 'grey',
  },
  field:{
    fontSize: 15,
    fontWeight: 'bold',
    color: '#666666'
  }
})

export default MyEventCard;
