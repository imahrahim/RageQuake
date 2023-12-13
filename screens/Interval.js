import { View, Text, StyleSheet } from "react-native";

import Seismograph from "../components/DataViz/Seismograph";
import { Color, FontFamily, FontSize } from "../constants/GlobalStyles";

export default function Interval() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RAGE INTERVAL</Text>
      <Text style={styles.description}>
        Explore the seismic intervals of your rage events. Dive into intensity
        levels over time and gain emotional awareness.
      </Text>
      <Seismograph />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary600,
  },
  title: {
    color: Color.primary200,
    fontFamily: FontFamily.black,
    fontSize: FontSize.sizeTitle,
    // textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 50,
  },
  description: {
    color: Color.primary200,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sizeDescription,
    marginHorizontal: 20,
    marginTop: 5
  },
});
