import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import { Color, FontSize } from '../../constants/GlobalStyles'


export default function IntensityItem({ intensityData }) {
    return (
      <View style={styles.intensityButton}>
        <Text style={styles.number}>{intensityData.intensity}</Text>
      </View>
    );
  }
  

const styles = StyleSheet.create({
    intensityButton: {
        width:50,
        height: 50,
        borderRadius: 30,
        borderColor: Color.primary600,
        borderWidth: 0.5,
        margin: 5,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }, number: {
        color: Color.primary600,
        fontSize: FontSize.sizeIntensity,
    }
})