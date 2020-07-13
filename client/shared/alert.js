import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';

const Alert = () => {
  const alerts = useSelector(state => state.alert);
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (alerts) {
      setVisible(true);
    }
  }, [alerts]);

  return (
    <View>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <View key={alert.id}>
            <Modal
              testID={'modal'}
              animationIn="bounceIn"
              backdropOpacity={0.8}
              onSwipeComplete={toggleOverlay}
              swipeDirection={['up', 'left', 'right', 'down']}
              isVisible={visible}
              onBackButtonPress={toggleOverlay}
              style={styles.overLay}
              onBackdropPress={toggleOverlay}
            >
              <View style={styles.content}>
                <Text style={styles.contentTitle}>{alert.msg} 👋!</Text>
              </View>
            </Modal>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  overLay: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});

export default Alert;
