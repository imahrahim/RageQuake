import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';

const RageForms = ({ onCancel, onSubmit, submitButtonLabel, defaultValues }) => {
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    // Update the selected date when defaultValues changes
    if (defaultValues?.timestamp) {
      setSelectedDate(defaultValues.timestamp);
    }
  }, [defaultValues]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleFormSubmit = () => {
    onSubmit({
      // Other form fields...
      timestamp: selectedDate,
    });
  };

  return (
    <View>

      <TextInput
        placeholder="Enter date (e.g., YYYY-MM-DD)"
        value={selectedDate}
        onChangeText={handleDateChange}
      />

      <Pressable title={submitButtonLabel} onPress={handleFormSubmit} />
    </View>
  );
};

export default RageForms;
