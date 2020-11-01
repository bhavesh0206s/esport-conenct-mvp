const { Expo } = require("expo-server-sdk");
const expo = new Expo();

const handlePushTokens = (pushToken ,{ title, detail }) => {
  let notifications = [];
  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
  }

  notifications.push({
    to: pushToken,
    sound: "default",
    title: title,
    vibrate: true,
    body: detail,
    data: { detail }
  });

  let chunks = expo.chunkPushNotifications(notifications);

  (async () => {
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        console.log(receipts);
      } catch (error) {
        console.error(error);
      }
    }
  })();
};

// const saveToken = token => {
//   console.log(token);
//   pushToken = token;
// };

exports.handlePushTokens = handlePushTokens;
// exports.saveToken = saveToken;