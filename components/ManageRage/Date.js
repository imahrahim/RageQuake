import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DatePicker({ onDateChange }) {
  const [chosenDate, setChosenDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const componentMounted = useRef(true);

  useEffect(() => {
    if (componentMounted.current) {
      // Skip the initial effect (component mount)
      componentMounted.current = false;
    } else {
      setShowPicker(false);
    }
  }, [chosenDate]);

  const onDateTimeChange = (event, date) => {
    if (event.type === "set" && date) {
      setChosenDate(date);
      onDateChange(date);
    }
  };

  return (
    <View style={styles.container}>
      {showPicker && (
        <DateTimePicker
          value={chosenDate}
          mode="date"
          is24Hour={true}
          display="spinner"
          onChange={onDateTimeChange}
        />
      )}
      <TextInput
        placeholder={chosenDate ? chosenDate.toDateString() : "Select Date"}
        editable={false}
        onTouchStart={() => setShowPicker(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
  },
});
