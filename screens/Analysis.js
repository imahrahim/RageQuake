import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";

import { Color, FontFamily, FontSize } from "../constants/GlobalStyles";
import TriggerChart from "../components/DataViz/TriggerChart";
import SituationChart from "../components/DataViz/SituationChart";

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
