import React from "react";
import { View, StyleSheet,ScrollView} from "react-native";

import { Color } from "../constants/GlobalStyles";
import TriggerChart from "../components/DataViz/TriggerChart";
import SituationChart from "../components/DataViz/SituationChart";

export default function Analysis() {


  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <TriggerChart  style={styles.chartContainer}/>
        <SituationChart style={styles.chartContainer}/>
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
  chartContainer:{
    margin:20,
    padding: 20,
    borderRadius: 30
  }
});
