import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { Avatar, Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import EditProfile from "./editProfile";
import Modal from "react-native-modal";
import { ScrollView } from "react-native-gesture-handler";
import Loading from "../../shared/loading";
import { getCurrentProfile } from "../../Redux/actions/profile";
import ProfileTabView from "./tabView";

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const userProfileInfo = useSelector((state) => state.profile);
  const {
    bio,
    name,
    myevents,
    username,
  } = userProfileInfo.userProfile;

  // Setting the visibility of Modal
  const [modalOpen, setModalOpen] = useState(false);

  if (!userProfileInfo.userProfile) {
    dispatch(getCurrentProfile());
    return <Loading />;
  } else {
    return (
      <>
        <View style={{ flexDirection: "column" }}>
          <Modal
            style={styles.overlay}
            isVisible={modalOpen}
            backdropColor="#3e3f42"
            animationIn="fadeInUp"
            animationOut="fadeOutDown"
            onBackButtonPress={() => setModalOpen(false)}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView
                style={{ flex: 1 }}
                keyboardShouldPersistTaps="always"
              >
                <EditProfile setModalOpen={setModalOpen} />
              </ScrollView>
            </TouchableWithoutFeedback>
          </Modal>
          <View
            style={{
              height: 80,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#839690",
            }}
          ></View>
          <Avatar
            size={80}
            rounded
            overlayContainerStyle={{ backgroundColor: "black" }}
            icon={{ name: "user", type: "font-awesome-5" }}
            onPress={() => console.log("Works!")}
            activeOpacity={1}
            containerStyle={{
              position: "absolute",
              marginTop: 40,
              marginHorizontal: 140,
            }}
          />
          <View style={{ position: "relative", paddingTop:40 }}>
          <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 15, color: 'grey' }}>({' '}{username ? username : ''}{' '})</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 20 }}>{name}</Text>
            </View>
            <Text
              style={{ fontSize: 12, color: "#000000", textAlign:'center' }}
            >
              About:{" "}
              <Text style={{ fontSize: 15, color: "#888888" }}>
                {bio ? bio : "Please fill this pepole want to know about you"}
              </Text>
            </Text>
          </View>
          <View style={{ flexDirection: "column", top: "3%" }}>
            <View
              style={{ marginVertical: 5, width: "20%", alignSelf: "center" }}
            >
              <Button title="Edit" buttonStyle={{marginBottom: 10}} onPress={() => setModalOpen(true)} />
            </View>
          </View>
        </View>
      <ProfileTabView/>
      </>
    );
  }
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "white",
    margin: 0, // This is the important style you need to set
  },
});

export default Profile;
