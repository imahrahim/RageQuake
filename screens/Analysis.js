import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView} from "react-native";

import { Color } from "../constants/GlobalStyles";
import TriggerChart from "../components/DataViz/TriggerChart";
import SituationChart from "../components/DataViz/SituationChart";

export default function Analysis() {


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TriggerChart  style={styles.chartContainer}/>
        <SituationChart style={styles.chartContainer}/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary600,
  },
  chartContainer:{
    margin:20,
    padding: 20,
    borderRadius: 30
  }
});
