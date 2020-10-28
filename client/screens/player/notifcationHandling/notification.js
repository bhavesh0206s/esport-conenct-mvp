import React from 'react';
import { View } from "react-native";
import { Image, Text,Button, Input } from 'react-native-elements';
import * as Notifications from 'expo-notifications';
import { useState } from 'react';
import { sendNotification } from '../../../Redux/actions/notifcaiton';

const Notification = () => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  
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
      <Input 
        placeholder='title...'
        value={title}
        onChangeText={(e) => setTitle(e)}
      />
      <Input 
        placeholder='body...'
        value={detail}
        onChangeText={(e) => setDetail(e)}
      />
      <Button 
        title='Receive Notification'
        onPress={() => sendNotification(title, detail)}
      />
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
