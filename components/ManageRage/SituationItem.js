import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Color, FontSize, FontFamily } from '../../constants/GlobalStyles';

export default function SituationItem({ situation, onSelect, selected }) {
  const handlePress = () => {
    onSelect(situation.situation); 
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={[styles.intensityButton]}>
        <Text style={[styles.number, { fontFamily: selected ? FontFamily.black: FontFamily.regular }]}>
          {situation.situation}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  intensityButton: {
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
  },
  number: {
    fontSize: FontSize.sizeOptions,
    fontFamily: FontFamily.regular
  },
});
