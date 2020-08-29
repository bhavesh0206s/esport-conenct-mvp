import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, ActivityIndicator, StyleSheet, ImageBackground } from "react-native";
import { Text, Card, Button, Icon, Image } from "react-native-elements";
import { gameImage } from "../../../shared/gameImage";
import moment from 'moment';
import { useSelector, useDispatch } from "react-redux";
import { deleteMyEvent } from "../../../Redux/actions/event";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import ConfirmModal from "../../../shared/confirmModal";

const MyEventCard = ({ item, navigation, deleteEvent}) => {
  const [imageUri, setImageUri] = useState("sd");
  const [modalOpen, setModalOpen] = useState(false);

  const currentUserUsername = useSelector(state => state.profile.userProfile.username)
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(deleteMyEvent(item, currentUserUsername))
  }

  const showDetails = () => {
    navigation.navigate('My Event Details', {item: item})
  }

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
      <ConfirmModal
        text='Are You Sure?' 
        setModalOpen={setModalOpen} 
        modalOpen={modalOpen} 
        handleOk={handleSubmit}
      />
      <Card 
        titleStyle={styles.mainTitle} 
        title={item.title} 
        imageStyle={styles.cardImage} 
        containerStyle={styles.container} 
        // image={imageUri}
      > 
        <TouchableOpacity
          onPress={showDetails}
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
        <View>
          <Button
            buttonStyle={styles.btnStyleDelete}
            icon={<MaterialCommunityIcons name="cancel" size={15} color='#fff' />}
            onPress={() => setModalOpen(true)}
            title="EXIT"
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
    backgroundColor:'rgba(0,0,0,0.4)',
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
    fontSize: 25
  },
  btnStyle:{
    borderRadius: 0,
    marginBottom: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  btnStyleDelete:{
    backgroundColor: 'red',
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
    color: '#fff'
  },
  field:{
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff'
  },
  
})

export default MyEventCard;
