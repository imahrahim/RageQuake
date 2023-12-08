import React, { useState } from "react";
import { View, StyleSheet, Platform, Pressable, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DatePicker({ onDateChange }) {
  const [chosenDate, setChosenDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onDateTimeChange = (event, date) => {
    setShowPicker(Platform.OS === "ios");
    if (event.type === "set" && date) {
      setChosenDate(date);
      onDateChange(date);
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={showDatePicker}>
        <Text>Show Date Picker</Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={chosenDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onDateTimeChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
});
