import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList } from "react-native";

import { Color } from "../constants/GlobalStyles";
import TriggerChart from "../components/DataViz/TriggerChart";
import SituationChart from "../components/DataViz/SituationChart";
import Seismograph from "../components/DataViz/Seismograph";

export default function Analysis() {


  return (
    <SafeAreaView style={styles.container}>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary600,
  }
});
