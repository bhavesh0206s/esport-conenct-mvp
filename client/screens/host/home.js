import React, { useEffect, useRef, useState } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Notifications from "expo-notifications";
import Loading from "../../shared/loading";
import { fetchallEvents } from "../../Redux/actions/event";
import Event from "./EventHandling/event";
import setAuthToken from "../../Redux/setAuthToken";
import AsyncStorage from "@react-native-community/async-storage";
import {
  getCurrentProfile,
  getHostCurrentProfile,
} from "../../Redux/actions/profile";
import { setHostNotificationToken } from "../../Redux/actions/notifcaiton";
import { registerForPushNotificationsAsync } from "../../utils/notification";

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
  const { hostedEvent, loading } = useSelector((state) => ({
    hostedEvent: state.profile.hostedEvent,
    loading: state.loading,
  }));

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getHostCurrentProfile());
    setRefreshing(false);
  };

  useEffect(() => {
    const loadHome = async () => {
      // console.log('Home Page refreshed');
      const token = await AsyncStorage.getItem("token");
      if (token !== null) {
        setAuthToken(token);
        setTimeout(() => dispatch(getHostCurrentProfile()), 100);
      }
    };
    loadHome();

    registerForPushNotificationsAsync(setHostNotificationToken).then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification)
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
          extraData={hostedEvent}
          data={hostedEvent}
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
