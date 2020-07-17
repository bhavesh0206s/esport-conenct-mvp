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
import AchivementCard from "./achivementCard";
import { TabView, SceneMap } from "react-native-tab-view";
import EventHostedCard from "./evnetHostedcard";

const achivements = () => (
  <View>
    <AchivementCard />
    <AchivementCard />
    <AchivementCard />
    <AchivementCard />
  </View>
);

const hostedEvents = () => (
  <View>
    <EventHostedCard />
    <EventHostedCard />
  </View>
);

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const userProfileInfo = useSelector((state) => state.profile);
  const {
    followers,
    following,
    bio,
    name,
    myevents,
  } = userProfileInfo.userProfile;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Achivements" },
    { key: "second", title: "Hosted Events" },
  ]);

  const renderScene = SceneMap({
    first: achivements,
    second: hostedEvents,
  });

  // Setting the visibility of Modal
  const [modalOpen, setModalOpen] = useState(false);

  if (!userProfileInfo.userProfile) {
    dispatch(getCurrentProfile());
    return <Loading />;
  } else {
    return (
      <ScrollView>
        <View style={{ flexDirection: "column" }}>
          <Modal
            style={styles.overlay}
            isVisible={modalOpen}
            backdropColor="#3e3f42"
            animationIn="fadeInUp"
            animationOut="fadeOutDown"
            animationInTiming={200}
            animationOutTiming={200}
            backdropTransitionInTiming={400}
            backdropTransitionOutTiming={400}
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
              height: "6%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "gray",
            }}
          ></View>
          <Avatar
            size={100}
            rounded
            overlayContainerStyle={{ backgroundColor: "black" }}
            icon={{ name: "user", type: "font-awesome-5" }}
            onPress={() => console.log("Works!")}
            activeOpacity={1}
            containerStyle={{
              position: "absolute",
              top: "1%",
              left: "38%",
              // alignItems: 'center',
            }}
          />
          <View style={{ position: "relative", top: "3%" }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 20 }}>{name}</Text>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Text style={{ fontSize: 14, color: "#000000" }}>
                Followers:{" "}
                <Text style={{ fontSize: 12, color: "#888888" }}>
                  {followers ? followers.length : 0}
                </Text>
              </Text>
              <Text style={{ fontSize: 14, color: "#000000" }}>
                Following:{" "}
                <Text style={{ fontSize: 12, color: "#888888" }}>
                  {following ? following.length : 0}
                </Text>
              </Text>
            </View>
            <Text
              style={{ fontSize: 14, color: "#000000", marginHorizontal: 10 }}
            >
              About:{" "}
              <Text style={{ fontSize: 12, color: "#888888" }}>
                {bio ? bio : "Please fill this pepole want to know about you"}
              </Text>
            </Text>
          </View>
          <View style={{ flexDirection: "column", top: "3%" }}>
            <View
              style={{ marginVertical: 5, width: "20%", alignSelf: "center" }}
            >
              <Button title="Edit" onPress={() => setModalOpen(true)} />
            </View>

            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              style={{backdropColor:'#4ecca3'}}
            />
          </View>
        </View>
      </ScrollView>
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
