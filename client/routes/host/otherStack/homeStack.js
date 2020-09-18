import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
  HeaderBackButton,
} from '@react-navigation/stack';
import Home from '../../../screens/host/home';
import Header from '../../../shared/header';
import EventTabView from '../../../screens/host/EventHandling/eventTabView';
import { Easing, StyleSheet } from 'react-native';
import { animationConfig } from '../../../shared/routeAnimationConfig';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EventDetailsCard from '../../../screens/host/EventHandling/eventDetailsCard';
import Participants from '../../../screens/host/EventHandling/participants';
import Animated from 'react-native-reanimated';
import { View, TouchableOpacity } from 'react-native';
import EventDetailsTopNavStack from './eventDetailsTopNavStack';
import ParticipantsTopNavStack from './participantsTopNavStack';

const Stack = createStackNavigator();

const Tab = createMaterialTopTabNavigator();

function MyTabBar({ state, descriptors, navigation, position }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0.3)),
        });

        const styles = StyleSheet.create({
          tabBar: {
            fontSize: 20,
            textAlign: 'center',
            padding: 10,
            backgroundColor: '#839690',
            color: '#eeeeee',
          },
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Animated.Text style={{ opacity, ...styles.tabBar }}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const MyTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 20 },
        tabStyle: { width: 100 },
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen name="Event Details" component={EventDetailsTopNavStack} />
      <Tab.Screen name="Participants" component={ParticipantsTopNavStack} />
    </Tab.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        transitionSpec: {
          open: animationConfig,
          close: animationConfig,
        },

        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      headerMode="screen"
    >
      <Stack.Screen
        name="Home"
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Header navigation={navigation} type="home-host" />
          ),
          drawerLockMode: 'locked-closed',
        })}
        component={Home}
      />
      <Stack.Screen
        name="EventDetailsCard"
        options={({ navigation, route }) => ({
          headerTitle: (props) => (
            <Header
              {...props}
              navigation={navigation}
              title="Event"
              type="EventDetailsCard"
            />
          ),
          headerLeft: (props) => (
            <HeaderBackButton {...props} tintColor="#4ecca3" />
          ),
          headerTitleContainerStyle: {
            left: 40,
          },
        })}
        component={MyTabs}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
