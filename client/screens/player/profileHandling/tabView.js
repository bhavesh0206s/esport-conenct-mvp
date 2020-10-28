import React from "react";
import { View, FlatList, Text, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AchivementCard from "../../../components/achivementCard";
import { useNavigation } from "@react-navigation/native";
import { Input } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

const achivementData = [
  {
    id: "4561232",
    title: "Pubg Winner",
  },
  {
    id: "7894654",
    title: "COD Winner",
  },
  {
    id: "7989878",
    title: "Clash Royale",
  },
];

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "white" }}
    style={{ backgroundColor: "#839690" }}
  />
);

const ProfileTabView = () => {
  const profileInfo = useSelector((state) => state.profile);
  const myEvents = profileInfo.userProfile.myhostedevents;
  const gameIds = profileInfo.userProfile.gameIds;
  const loading = profileInfo.loading;
  const navigation = useNavigation();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "GameIds" },
    { key: "second", title: "Achivements" },
  ]);

  const achivements = () => (
    <View>
      <FlatList
        data={achivementData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AchivementCard title={item.title} />}
      />
    </View>
  );
  console.log(gameIds);
  const GameIds = () => (
    <View style={{ flex: 1}}>
      <ScrollView>
       {/* <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}> */}
        <Input
          label='PUBG ID'
          disabled={true}
          // pointerEvents="none"
          placeholder={gameIds.PUBG ? gameIds.PUBG : "No ID Provided"}
          value={gameIds.PUBG}
          onFocus={() => console.log('Helel')}
        />
       {/* </TouchableOpacity> */}
        <Input
          label='Clash of Clans Tag'
          disabled={true}
          placeholder={gameIds.coc ? gameIds.coc : "No ID Provided"}
          value={gameIds.coc}
        />
        <Input
          label='Clash Royale ID'
          disabled={true}
          placeholder={gameIds.cr ? gameIds.cr : "No ID Provided"}
          value={gameIds.cr}
        />
        <Input
          label='Call of Duty Mobile ID'
          disabled={true}
          placeholder={gameIds.cod ? gameIds.cod : "No ID Provided"}
          value={gameIds.cod}
        />
        <Input
          label='Fire Fire ID'
          disabled={true}
          placeholder={gameIds.freefire ? gameIds.freefire : "No ID Provided"}
          value={gameIds.freefire}
        />
        <Input
          label='Valorant - RiotID'
          disabled={true}
          placeholder={gameIds.valorant.riotId ? gameIds.valorant.riotId : "No ID Provided"}
          value={gameIds.valorant.riotId}
        />
        <Input
          label='Valorant - Tagline'
          disabled={true}
          placeholder={gameIds.valorant.tagline ? gameIds.valorant.tagline : "No ID Provided"}
          value={gameIds.valorant.tagline}
        />
      </ScrollView>
    </View>
  );

  const renderScene = SceneMap({
    first: GameIds,
    second: achivements,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      style={{ flex: 1 }}
    />
  );
};

const styles = StyleSheet.create({
  leftTextStyle: {
    flex: 1,
    color: "white",
    fontSize: 18,
    paddingRight: 8,
    textAlign: "center",
  },
  rightTextStyle: {
    flex: 1,
    textAlign: "center",
    color: "blue",
    fontSize: 18,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
  },
  commonViewStyle: {
    // flexDirection: "row",
  },
});

export default ProfileTabView;
