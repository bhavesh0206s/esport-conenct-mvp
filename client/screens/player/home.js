import React, { useEffect, useRef, useState } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../shared/loading";
import { fetchallEvents } from "../../Redux/actions/event";
import Event from "./EventHandling/event";
import setAuthToken from "../../Redux/setAuthToken";
import AsyncStorage from "@react-native-community/async-storage";
import { getCurrentProfile } from "../../Redux/actions/profile";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { setNotificationToken } from "../../Redux/actions/notifcaiton";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const { allEvents, loading } = useSelector((state) => ({
    allEvents: state.event.allEvents,
    loading: state.loading,
  }));

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchallEvents());
    setRefreshing(false);
  };

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
      setNotificationToken(token);
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

  useEffect(() => {
    (async () => {
      console.log("Home Page refreshed");
      const token = await AsyncStorage.getItem("token");
      if (token !== null) {
        console.log(token);
        setAuthToken(token);
      }
      setTimeout(() => {
        dispatch(fetchallEvents());
        dispatch(getCurrentProfile());
      }, 100);
    })();
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <View>
        <FlatList
          nestedScrollEnabled
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          extraData={allEvents}
          data={allEvents}
          onEndReachedThreshold={0.5}
          initialNumToRender={6}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Event item={item} navigation={navigation} />
          )}
        />
      </View>
    );
  }
};

export default Home;
