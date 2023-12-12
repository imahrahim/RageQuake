import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";

import { Color, FontFamily, FontSize } from "../constants/GlobalStyles";
import TriggerChart from "../components/DataViz/TriggerChart";
import SituationChart from "../components/DataViz/SituationChart";
import { LinearGradient } from "expo-linear-gradient";

export default function Analysis() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View>
          <Text style={styles.title}>EPICENTER INSTIGATOR</Text>
        </View>
        <TriggerChart style={styles.chartContainer} />
        <View>
        <Text style={styles.title}>TEMPER TERRAIN</Text>
        </View>
        <SituationChart style={styles.chartContainer} />
      </ScrollView>

      <LinearGradient
        style={{ position: "absolute", bottom: 20, width: "100%", height: 75 }}
        colors={["#001e1d00", Color.primary600]}
        locations={[0, 0.3]}
        pointerEvents={"none"}
      />
      <LinearGradient
        style={{ position: "absolute", top: 0, width: "100%", height: 20 }}
        colors={[Color.primary600, "#001e1d00"]}
        locations={[0.1, 1]}
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
  scroll: {
    marginBottom: 75,
  },
  chartContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 30,
  },
  title: {
    color: Color.primary200,
    fontFamily: FontFamily.black,
    FontSize: FontSize.sizeTitle,
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 30,
  },
});
