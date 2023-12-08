// RageForms.js
import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import Input from "./Input";
import { Color , FontFamily} from "../../constants/GlobalStyles";
import DatePicker from './Date'
import MultiSelect from "./MultiSelect";

import intensityData from "../../data/intensity";
import IntensityItem from "./IntensityItem";
import situations from "../../data/situation";
import SituationItem from "./SituationItem";
import triggers from "../../data/trigger";
import TriggerItem from "./TriggerItem";

export default function RageForms({ onCancel, onSubmit, submitButtonLabel , defaultValues}) {
  const [inputValue, setInputValue] = useState({
    title: defaultValues? defaultValues.title : '',
    timestamp: defaultValues? new Date(defaultValues.timestamp ): '',
    intensity: defaultValues? defaultValues.intensity : null,
    trigger:defaultValues? defaultValues.trigger : null,
    situation: defaultValues? defaultValues.situation : null,
    description: defaultValues? defaultValues.description : '',
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
    if (date) {
      const newTimestamp = new Date(date);
      setInputValue((currentInputValues) => ({
        ...currentInputValues,
        timestamp: newTimestamp.toISOString(),
      }));
    }
  }
  

  function submitHandler() {
    const rageData = {
      title: inputValue.title,
      timestamp: inputValue.timestamp,
      intensity: inputValue.intensity,
      trigger: inputValue.trigger,
      situation: inputValue.situation,
      description: inputValue.description,
    };
   
    onSubmit(rageData);
  }

  const handleSelect = (selectedOption, type) => {
    setInputValue((currentInputValues) => ({
      ...currentInputValues,
      [type]: selectedOption,
    }));
  };

  const handleIntensitySelect = (selectedIntensity) => {
   
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
        <DatePicker onDateChange={handleDateChange} />
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
        renderItem={({ item }) => (
          <TriggerItem
            triggers={item}
            onSelect={(selectedOption) => handleSelect(selectedOption, "trigger")}
            selected={inputValue.trigger === item.trigger}
            defaultSelected={defaultValues ? defaultValues.trigger === item.trigger : false}
          />
        )}
      />

      <MultiSelect
        label="SEISMIC SCENARIO"
        data={situations}
        renderItem={({ item }) => (
          <SituationItem
            situation={item}
            onSelect={(selectedOption) =>
              handleSelect(selectedOption, "situation")}
               selected={inputValue.situation === item.situation}
               defaultSelected={defaultValues ? defaultValues.situation === item.situation : false}
          />
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
    fontFamily: FontFamily.regular
  },
  date: {
    alignSelf: "stretch",
  },
});
