import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderBackButton,
} from "@react-navigation/stack";
import Home from "../../../screens/player/home";
import Header from "../../../shared/header";
import { animationConfig } from "../../../shared/routeAnimationConfig";
import EventRegistration from "../../../screens/player/EventHandling/eventRegistration";
import SearchStack from "./searchStack";
import EventDetails from "../../../screens/player/EventHandling/eventDetails";
import SearchedUserProfile from "../../../screens/player/profileHandling/searchedUserProfile";
import EventReview from "../../../screens/player/EventHandling/eventReview";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
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
            <Header navigation={navigation} type="home" title="EBind" />
          ),
          drawerLockMode: "locked-closed",
        })}
        component={Home}
      />
      <Stack.Screen
        name="Search"
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Header navigation={navigation} title="Search" type="Search" />
          ),
          headerLeft: (props) => (
            <HeaderBackButton {...props} tintColor="#4ecca3" />
          ),
          headerTitleContainerStyle: {
            left: 40,
          },
        })}
        component={SearchStack}
      />
      <Stack.Screen
        name="EventDetails"
        options={({ navigation, route }) => ({
          headerTitle: (props) => (
            <Header
              {...props}
              navigation={navigation}
              title={route.params.title}
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
        component={EventDetails}
      />
      <Stack.Screen
        name="Register"
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Header navigation={navigation} title="Register" type="register" />
          ),
          headerLeft: (props) => (
            <HeaderBackButton {...props} tintColor="#4ecca3" />
          ),
          headerTitleContainerStyle: {
            left: 40,
          },
        })}
        component={EventRegistration}
      />
      <Stack.Screen
        name="Userprofile"
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Header
              navigation={navigation}
              title={route.params?.HostProfileTitle ?? "Host Profile"}
              type="userProfile"
            />
          ),
          headerLeft: (props) => (
            <HeaderBackButton {...props} tintColor="#4ecca3" />
          ),
          headerTitleContainerStyle: {
            left: 40,
          },
        })}
        component={SearchedUserProfile}
      />
      <Stack.Screen
        name="EventDetailsProfile"
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Header
              navigation={navigation}
              title="Hosted Event Details "
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
        component={EventDetails}
      />
      <Stack.Screen
        name="Reviews"
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Header navigation={navigation} title="Reviews" type="reviews" />
          ),
          headerLeft: (props) => (
            <HeaderBackButton {...props} tintColor="#4ecca3" />
          ),
          headerTitleContainerStyle: {
            left: 40,
          },
        })}
        component={EventReview}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
