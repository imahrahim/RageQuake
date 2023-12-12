import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Color, FontSize, FontFamily } from "../../constants/GlobalStyles";

export default function TriggerItem({
  triggers,
  onSelect,
  selected,
  defaultSelected,
  invalid,
}) {
  const handlePress = () => {
    onSelect(triggers.trigger);
  };

  return (
    <Pressable onPress={handlePress}>
      <View   style={[
          styles.intensityButton,
          { backgroundColor: selected ? Color.primary600 : Color.primary200 },
          invalid && styles.invalidInput,
        ]}>
        <Text
          style={[
            styles.number,
            {
              fontFamily: selected ? FontFamily.black : FontFamily.regular,
              color: selected ? Color.primary200 : Color.primary600
            },
            invalid && styles.invalidLabel,
          ]}
        >
          {triggers.trigger}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  intensityButton: {
    marginHorizontal: 5,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
    borderColor: Color.primary600,
    borderWidth: 0.5,
  },
  number: {
    fontSize: FontSize.sizeOptions,
    fontFamily: FontFamily.regular,
  },
  invalidLabel: {
    color: Color.secondary400
  }
});
