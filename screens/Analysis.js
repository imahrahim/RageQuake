import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList } from "react-native";

import { Color } from "../constants/GlobalStyles";
import TriggerChart from "../components/DataViz/TriggerChart";
import SituationChart from "../components/DataViz/SituationChart";
import Seismograph from "../components/DataViz/Seismograph";

export default function Analysis() {



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text>EPICENTRUM</Text>
        <View style={styles.chartContainer}>
          <Seismograph style={styles.chart} />
        </View>  
        <View style={styles.chartContainer}>
          <SituationChart style={styles.chart} />
        </View>  
        <View style={styles.chartContainer}>
        <TriggerChart style={styles.chart} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary600,
  },
  contentContainer: {
    flex: 1,
    marginTop: 50,
    marginBottom: 40,
  },
  chartContainer: {
    flexDirection: "row",
  },
  chart: {
    flex: 1,
    minHeight: 700, // Set a minimum height for each chart
    marginVertical: 20, // Add margin between charts
    width: "100%", // Set width as needed
    borderColor: 'red',
    borderWidth: 2
  },
});
