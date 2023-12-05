import { View, Text, StyleSheet, SafeAreaView } from 'react-native'

import { Color } from '../constants/GlobalStyles';

export default function Analysis() {
  return (
    <View style={styles.container}>
    <SafeAreaView style={styles.contentContainer}>
    <Text>Analysis</Text>
    </SafeAreaView>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary600,
  },
  contentContainer: {
    flex: 1,
    margin: 50
  }
});