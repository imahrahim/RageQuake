import { View, Text, StyleSheet, Pressable } from "react-native";
import { Color, FontSize, FontFamily } from "../../constants/GlobalStyles";
import { useState } from "react";

export default function IntensityItem({
  intensityData,
  onSelect,
  selected,
  invalid,
}) {
  const handlePress = () => {
    onSelect(intensityData.intensity);
  };
 
  return (
    <Pressable onPress={handlePress}>
      <View
        style={[
          styles.intensityButton,
          { backgroundColor: selected ? Color.primary600 : Color.primary200 },
          invalid && styles.invalidInput,
        ]}
      >
        <Text
          style={[
            styles.number,
            {
              color: selected ? Color.primary200 : Color.primary600,
              fontFamily: selected ? FontFamily.black : FontFamily.regular,
            },
            invalid && styles.invalidLabel,
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
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 0.5,
    marginHorizontal: 5,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontSize: FontSize.sizeIntensity,
  },
  invalidLabel: {
    color: Color.secondary400,
    fontFamily: FontFamily.black,
  },
  invalidInput: {
    borderColor: Color.secondary400,
  },
});
