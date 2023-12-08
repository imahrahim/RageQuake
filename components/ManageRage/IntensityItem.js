import { View, Text, StyleSheet, Pressable } from 'react-native'

import { Color, FontSize, FontFamily } from '../../constants/GlobalStyles'
import { useState } from 'react';


export default function IntensityItem({ intensityData, onSelect, selected  }) {

  const handlePress = () => {
    onSelect(intensityData.intensity);
  };


  return (
    <Pressable onPress={handlePress}>
      <View
        style={[
          styles.intensityButton,
          { backgroundColor: selected ? Color.primary600 : Color.primary200 },
        ]}
      >
        <Text
          style={[
            styles.number,
            { color: selected ? Color.primary200 : Color.primary600 ,   fontFamily: selected ? FontFamily.black: FontFamily.regular  },
          ]}
        >
          {intensityData.intensity}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    intensityButton: {
        width:50,
        height: 50,
        borderRadius: 30,
        borderColor: Color.primary600,
        borderWidth: 0.5,
        marginHorizontal: 5,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }, number: {
        color: Color.primary600,
        fontSize: FontSize.sizeIntensity,
    }
})