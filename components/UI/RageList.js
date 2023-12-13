import { View, StyleSheet, SafeAreaView, FlatList, Text } from "react-native";
import RageCard from "./RageCard";
import { LinearGradient } from "expo-linear-gradient";

import { Color, FontSize, FontFamily } from "../../constants/GlobalStyles";

export default function RageList({ rageQuakes, fallbackText }) {
  if (rageQuakes.length === 0) {
    return <Text style={styles.infoText}>{fallbackText}</Text>;
  }

  const renderRageItem = ({ item }) => <RageCard {...item} />;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.contentContainer}>
        <FlatList
          data={rageQuakes}
          renderItem={renderRageItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <LinearGradient
        style={{ position: "absolute", bottom: 20, width: "100%", height: 75 }}
        colors={["#001e1d00", Color.primary600]}
        locations={[0, 0.3]}
        pointerEvents={"none"}
      />
      <LinearGradient
        style={{ position: "absolute", top: 0, width: "100%", height: 100 }}
        colors={[Color.primary600, "#001e1d00"]}
        locations={[0.8, 1]}
        pointerEvents={"none"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary600,
  },
  contentContainer: {
    flex: 1,
    marginVertical: 75,
    marginHorizontal: 10,
  },
  infoText: {
    color: Color.primary200,
    fontSize: FontSize.sizeDescription,
    fontFamily: FontFamily.regular,
    textAlign: "center",
    margin: 32,
  },
});
