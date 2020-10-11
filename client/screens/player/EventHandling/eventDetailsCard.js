import React, { useEffect, useRef } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getHostProfileById,
  upadteProfile,
} from "../../../Redux/actions/profile";
import { eventRegistration } from "../../../Redux/actions/event";
import Loading from "../../../shared/loading";
import { CLEARPARTICULARUSER } from "../../../Redux/actions/types";
import ConfirmModal from "../../../shared/confirmModal";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const EventDetailsCard = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { userProfile, hostProfile, loading, userProfilePNToken } = useSelector(
    (state) => ({
      userProfile: state.profile.userProfile,
      userProfilePNToken: state.profile.mypntoken,
      hostProfile: state.profile.particularUser,
      loading: state.loading,
    })
  );
  const [eventId] = useState(userProfile.myevents.map((item) => item._id));
  const { eventdetails, imageUri, viewingProfile, showhostBy } = route.params;
  const [eventTime, setEventTime] = useState(
    moment(eventdetails.time).format("dddd, MMMM Do YYYY, h:mm:ss a")
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const { name } = route;

  
  const {
    title,
    description,
    game,
    teamsize,
    prizepool,
    entryFee,
    contact,
    hostedBy,
    _id,
    user,
    hostedById,
  } = eventdetails;

  // Handling notification
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    if (!userProfilePNToken) {
      registerForPushNotificationsAsync().then((token) =>
        setExpoPushToken(token)
      );
    }

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
        console.log("Congo ye notification pe click kar diya aapne");
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  // Register for receiving PN
  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);

      dispatch(upadteProfile({ mypntoken: token }));
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  const handleRegistration = () => {
    dispatch(
      eventRegistration({
        registerinfo: {
          email: userProfile.email,
          name: userProfile.name,
          contact: userProfile.contact,
          username: userProfile.username,
          user: userProfile.user,
        },
        eventdetails,
        eventId: _id,
        usereventId: user,
        teamsize,
      })
    );

    // This notification is scheduled
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Competetion starting",
        body: "Bhai app pe on aaja competetion start hone wala hai",
      },
      trigger: {
        seconds: 60,
      },
    });

    setModalOpen(false);
    navigation.navigate("Event");
  };

  const handleSubmit = () => {
    if (userProfile.email === hostProfile.email) {
      alert("Host of the Event, can't Register!");
    } else if (eventId.indexOf(_id) !== -1) {
      alert("Already Registered!!");
    } else if (teamsize === 1) {
      setModalOpen(true);
    } else {
      navigation.navigate("Register", {
        navigation,
        eventdetails,
        userProfile,
      });
    }
  };

  const showHostProfile = () => {
    dispatch({ type: CLEARPARTICULARUSER });
    dispatch(getHostProfileById(hostedById, navigation));
    navigation.navigate("Userprofile", { isHostProfile: true });
  };

  useEffect(() => {
    navigation.setParams({
      title,
    });
  }
  const showHostProfile = () => {
    dispatch({ type: CLEARPARTICULARUSER });
    dispatch(getHostProfileById(hostedById, navigation));
    navigation.navigate('Userprofile',{isHostProfile: true});
  }
  useEffect(() => {
    navigation.setParams({ 
      title
    })
    // dispatch(fetchEventDetails(eventId[0]))
    dispatch(getHostProfileById(hostedById, navigation, false));
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  } else {
    return (
      <ScrollView>
        <ConfirmModal
          text="Complete Registration For Single Player Event!"
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          handleOk={handleRegistration}
        />

        <Card containerStyle={styles.container}>
          {viewingProfile && (
            <Card.Title style={styles.mainTitle}>{title}</Card.Title>
          )}
          <Card.Image source={imageUri} style={styles.cardImage} />
          <View style={styles.cardView}>
            <Button
              icon={<Icon name="form" type="antdesign" color="#ffffff" />}
              buttonStyle={styles.btnStyle}
              onPress={handleSubmit}
              title="Registration"
            />
            <Text style={styles.title}>Game: </Text>
            <Text style={styles.field}>{game}</Text>
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
            {showhostBy && (
              <View>
                <Text style={styles.title}>Hosted by: </Text>
                <TouchableOpacity onPress={showHostProfile}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 18 }}>{hostProfile.name} </Text>
                    <Text style={{ ...styles.title, fontSize: 18 }}>
                      ({hostedBy})
                    </Text>
                  </View>
                  <Text style={{ color: "#4ecca3" }}>View Profile</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Card>
      </ScrollView>
    );
  }
};

// const sendPushNotification = async (expoPushToken) => {
//   const message = {
//     to: expoPushToken,
//     sound: "default",
//     title: "Demo",
//     body: "Demo Notification",
//     data: { data: "goes here" },
//   };

//   await fetch("https://exp.host/--/api/v2/push/send", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Accept-encoding": "gzip, deflate",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(message),
//   });

//   Notifications.scheduleNotificationAsync({
//     content: {
//       title: "Scheduled notification",
//       body: "Scheduled notification hai ye",
//     },
//     trigger: {
//       seconds: 60,
//     },
//   });
// };

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
