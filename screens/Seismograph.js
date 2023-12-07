import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import { Color } from '../constants/GlobalStyles';

export default function Seismograph() {
  return (
    <View style={styles.container}>
      <Text>Seismograph</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary600,
  },
});