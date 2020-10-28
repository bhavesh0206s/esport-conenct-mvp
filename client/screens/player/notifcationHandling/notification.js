import React from 'react';
import { View } from "react-native";
import { Image, Text,Button } from 'react-native-elements';
import * as Notifications from 'expo-notifications';

const Notification = () => {
  const schedulePushNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 1 },
    });
  }
  return (
    <View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  );
}
 
export default Notification;
