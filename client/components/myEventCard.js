import React from "react";
import { View, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { Text, Card } from "react-native-elements";
import moment from 'moment';

const MyEventCard = ({ item , handleSubmit, imageUri}) => {

  return (
      <Card containerStyle={styles.container} >
        <Card.Title style={styles.mainTitle}>{item.title}</Card.Title>
        <TouchableOpacity
          onPress={handleSubmit}
          activeOpacity={0.4}
        >
          <ImageBackground 
            imageStyle={{ borderRadius: 20}} 
            source={imageUri} 
            style={styles.image} 
          >
            <View style={styles.content}>
              <View style={{ flexDirection: "column" }}>
                <View style={styles.fieldView}>
                  <Text style={styles.fieldTitle}>Game: </Text>
                  <Text style={styles.field}>{item.game}</Text>
                </View>
                <View style={styles.fieldView}>
                  <Text style={styles.fieldTitle}>Entryfee: </Text>
                  <Text style={styles.field}>{item.entryFee}</Text>
                </View>
                <View style={styles.fieldView}>
                  <Text style={styles.fieldTitle}>Date&Time: </Text>
                  <Text style={styles.field}>{moment(item.time).format("Do MMMM YYYY, h:mm a")}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "column" }}>
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
          </ImageBackground>
        </TouchableOpacity>
      </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 8,
    // marginBottom: 10
    borderWidth: 0
  },
  content :{
    flexDirection: "row", 
    justifyContent: "space-around",
    backgroundColor:'rgba(57, 62, 70,0.9)',
    borderRadius: 20
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    padding: 10,
  },
  cardImage: {
    borderRadius: 20
  },
  mainTitle:{
    fontSize: 25,
    color: '#eeeeee'
  },
  btnStyle:{
    borderRadius: 0,
    marginBottom: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  btnStyleDelete:{
    backgroundColor: '#d9534f',
    borderRadius: 0,
    marginBottom: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  fieldView:{
    borderBottomWidth: 1,
    borderColor: "#dbdbdb",
  },
  fieldTitle:{
    color: '#95bdb5',
  },
  field:{
    fontSize: 15,
    fontWeight: 'bold',
    color: '#eeeeee'
  },
  
})

export default MyEventCard;
