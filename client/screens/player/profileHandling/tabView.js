import React from "react";
import { View, FlatList, Text, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AchivementCard from "../../../components/achivementCard";
import { useNavigation } from "@react-navigation/native";

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

  const GameIds = () => (
    <View style={{ flex: 1, backgroundColor: "coral" }}>
      <ScrollView>
        <View style={styles.commonViewStyle}>
          <Text style={styles.leftTextStyle}>PUBGId:</Text>
          <Text style={styles.rightTextStyle}>{gameIds.PUBG}</Text>
        </View>
        <View style={styles.commonViewStyle}>
          <Text style={styles.leftTextStyle}>COC tag:</Text>
          <Text style={styles.rightTextStyle}>{gameIds.coc}</Text>
        </View>
        <View style={styles.commonViewStyle}>
          <Text style={styles.leftTextStyle}>CR tag:</Text>
          <Text style={styles.rightTextStyle}>{gameIds.cr}</Text>
        </View>
        <View style={styles.commonViewStyle}>
          <Text style={styles.leftTextStyle}>COD Id:</Text>
          <Text style={styles.rightTextStyle}>{gameIds.cod}</Text>
        </View>
        <View style={styles.commonViewStyle}>
          <Text style={styles.leftTextStyle}>Freefire Id:</Text>
          <Text style={styles.rightTextStyle}>{gameIds.freefire}</Text>
        </View>
        <View style={styles.commonViewStyle}>
          <Text style={styles.leftTextStyle}>Valorant(riotId):</Text>
          <Text style={styles.rightTextStyle}>{gameIds.valorant.riotId}</Text>
        </View>
        <View style={styles.commonViewStyle}>
          <Text style={styles.leftTextStyle}>Valorant(tagline):</Text>
          <Text style={styles.rightTextStyle}>{gameIds.valorant.tagline}</Text>
        </View>
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
    flexDirection: "row",
  },
});

export default ProfileTabView;
