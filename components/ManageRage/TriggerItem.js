import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Color, FontSize } from '../../constants/GlobalStyles';

export default function TriggerItem({ triggers, onSelect, selected }) {


  const handlePress = () => {
    onSelect(triggers.trigger); 
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={[styles.intensityButton]}>
        <Text style={[styles.number, { fontWeight: selected ? 'bold' : 'regular' }]}>
          {triggers.trigger}
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
  },
});
