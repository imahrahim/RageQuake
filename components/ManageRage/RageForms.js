// RageForms.js
import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import Input from "./Input";
import { Color } from "../../constants/GlobalStyles";
import Date from "./Date";
import MultiSelect from "./MultiSelect";

import intensityData from "../../data/intensity";
import IntensityItem from "./IntensityItem";
import situations from "../../data/situation";
import SituationItem from "./SituationItem";
import triggers from "../../data/trigger";
import TriggerItem from "./TriggerItem";

export default function RageForms({ onCancel, onSubmit, submitButtonLabel }) {
  const [inputValue, setInputValue] = useState({
    title: "",
    timestamp: "",
    intensity: null,
    trigger: "",
    situation: "",
    description: "",
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValue((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  function handleDateChange(date) {
    const newTimestamp = new Date(date);
    console.log("New timestamp:", newTimestamp);
    setInputValue((currentInputValues) => ({
      ...currentInputValues,
      timestamp: newTimestamp.toISOString(),
    }));
  }

  function submitHandler() {
    const rageData = {
      title: inputValue.title,
      timestamp: inputValue.timestamp,
      intensity: +inputValue.intensity,
      trigger: inputValue.trigger,
      situation: inputValue.situation,
      description: inputValue.description,
    };
    console.log("Submitting rageData:", rageData);
    onSubmit(rageData);
  }

  const handleSelect = (selectedSituation) => {
    // Update intensity or perform any other logic based on the selected situation
    console.log("Selected Situation:", selectedSituation);
  };

  const handleIntensitySelect = (selectedIntensity) => {
    console.log("Selected Situation:", selectedIntensity);
    setInputValue((currentInputValues) => ({
      ...currentInputValues,
      intensity: selectedIntensity,
    }));
  };


  return (
    <View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={onCancel}>
          <Text style={styles.buttonText}>cancel</Text>
        </Pressable>
        <Pressable onPress={submitHandler}>
          <Text style={styles.buttonText}>{submitButtonLabel}</Text>
        </Pressable>
      </View>
      <View style={styles.date}>
        <Date onDateChange={handleDateChange} />
      </View>
      <Input
        label="RAGEQUAKE"
        textInputConfig={{
          placeholder: "Add Title",
          onChangeText: inputChangedHandler.bind(this, "title"),
          value: inputValue.title,
          maxLength: 100,
          autoCorrect: false,
          autoCapitalize: "words",
        }}
      />
      <MultiSelect
      label="INTENSITY RICHTER"
      data={intensityData}
      renderItem={({ item }) => (
        <IntensityItem
          intensityData={item}
          onSelect={handleIntensitySelect}
          selected={inputValue.intensity === item.intensity}
        />
      )}
    />
      <MultiSelect
        label="EPICENTER INSTIGATOR"
        data={triggers}
        renderItem={({ item }) => <TriggerItem triggers={item} onSelect={handleSelect}/>}
      />
      <MultiSelect
        label="SEISMIC SCENARIO"
        data={situations}
        renderItem={({ item }) => (
          <SituationItem situation={item} onSelect={handleSelect} />
        )}
      />

      <Input
        label="SHAKING RECAP"
        textInputConfig={{
          placeholder: "Description",
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputValue.description,
          multiline: true,
        }}
        style={{ height: 150 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    color: Color.primary600,
  },
  date: {
    alignSelf: "stretch",
  },
});
