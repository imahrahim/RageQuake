import React, { useState } from "react";
import { View, StyleSheet, Platform, Pressable, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DatePicker() {
  const [chosenDate, setChosenDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(true);

  const onDateChange = (event, date) => {
    setShowPicker(Platform.OS === "ios");
    setChosenDate(date);
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={styles.container}>
      {showPicker && (
        <DateTimePicker
          value={chosenDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
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
