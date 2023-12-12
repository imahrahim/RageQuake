// RageForms.js
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Input from "./Input";
import { Color, FontFamily } from "../../constants/GlobalStyles";
import MultiSelect from "./MultiSelect";

import intensityData from "../../data/intensity";
import IntensityItem from "./IntensityItem";
import situations from "../../data/situation";
import SituationItem from "./SituationItem";
import triggers from "../../data/trigger";
import TriggerItem from "./TriggerItem";
import { getFormattedDate } from "../../util/date";

export default function RageForms({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) {
  const [inputs, setInputs] = useState({
    title: {
      value: defaultValues ? defaultValues.title : "",
      isValid: true,
    },
    timestamp: {
      value: defaultValues ? getFormattedDate(defaultValues.timestamp) : "",
      isValid: true,
    },
    intensity: {
      value: defaultValues ? defaultValues.intensity : null,
      isValid: true,
    },
    trigger: {
      value: defaultValues ? defaultValues.trigger : null,
      isValid: true,
    },
    situation: {
      value: defaultValues ? defaultValues.situation : null,
      isValid: true,
    },
    description: defaultValues ? defaultValues.description : "",
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function handleDateChange(date) {
    if (date) {
      setInputs((currentInputs) => ({
        ...currentInputs,
        timestamp: { value: date, isValid: true },
      }));
    }
  }

  function submitHandler() {
    const rageData = {
      title: inputs.title.value,
      timestamp: new Date(inputs.timestamp.value),
      intensity: inputs.intensity.value,
      trigger: inputs.trigger.value,
      situation: inputs.situation.value,
      description: inputs.description,
    };

    const intensityIsValid =
    rageData.intensity !== null;
    const timestampIsValid = rageData.timestamp.toString() !== "Invalid Date";
    const titleIsValid = rageData.title.trim().length > 0;
    const triggerIsValid = rageData.trigger !== null;
    const situationIsValid = rageData.situation !== null;

    if (
      !intensityIsValid ||
      !timestampIsValid ||
      !titleIsValid ||
      !triggerIsValid ||
      !situationIsValid
    ) {
      //  Alert.alert('Invalid input', 'Please check your input values')
      setInputs((currentInputs) => {
        return {
          title: { value: currentInputs.title.value, isValid: titleIsValid },
          timestamp: {
            value: currentInputs.timestamp.value,
            isValid: timestampIsValid,
          },
          intensity: {
            value: currentInputs.intensity.value,
            isValid: intensityIsValid,
          },
          trigger: {
            value: currentInputs.trigger.value,
            isValid: triggerIsValid,
          },
          situation: {
            value: currentInputs.situation.value,
            isValid: situationIsValid,
          },
        };
      });
      return;
    }

    onSubmit(rageData);
  }

  const formIsInvalid =
    !inputs.title.isValid ||
    !inputs.timestamp.isValid ||
    !inputs.intensity.isValid ||
    !inputs.trigger.isValid ||
    !inputs.situation.isValid;

    const handleSelect = (selectedOption, type) => {
      setInputs((currentInputs) => ({
        ...currentInputs,
        [type]: { value: selectedOption, isValid: true },
      }));
    };
    
    const handleIntensitySelect = (selectedIntensity) => {
      setInputs((currentInputs) => ({
        ...currentInputs,
        intensity: { value: selectedIntensity, isValid: true },
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
      <Input
        label="SEISMIC SCHEDULE"
        invalid={!inputs.timestamp.isValid}
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          value: inputs.timestamp.value,
          onChangeText: (text) => handleDateChange(text),
          maxLength: 10,
        }}
      />
      <Input
        label="ANGER ANECDOTE"
        invalid={!inputs.title.isValid}
        textInputConfig={{
          placeholder: "Add Title",
          onChangeText: inputChangedHandler.bind(this, "title"),
          value: inputs.title.value,
          maxLength: 100,
          autoCorrect: false,
          autoCapitalize: "words",
        }}
      />
      <MultiSelect
        label="INTENSITY RICHTER"
        invalid={!inputs.intensity.isValid}
        data={intensityData}
        renderItem={({ item }) => (
          <IntensityItem
            intensityData={item}
            onSelect={handleIntensitySelect}
            selected={inputs.intensity.value === item.intensity}
            invalid={!inputs.intensity.isValid}
          />
        )}
      />
      <MultiSelect
        label="EPICENTER INSTIGATOR"
        invalid={!inputs.trigger.isValid}
        data={triggers}
        renderItem={({ item }) => (
          <TriggerItem
            triggers={item}
            onSelect={(selectedOption) =>
              handleSelect(selectedOption, "trigger")
            }
            selected={inputs.trigger.value === item.trigger}
            defaultSelected={
              defaultValues ? defaultValues.trigger === item.trigger : false
            }
            invalid={!inputs.trigger.isValid}
          />
        )}
      />

      <MultiSelect
        label="TEMPER TERRAIN"
        invalid={!inputs.situation.isValid}
        data={situations}
        renderItem={({ item }) => (
          <SituationItem
            situation={item}
            onSelect={(selectedOption) =>
              handleSelect(selectedOption, "situation")
            }
            selected={inputs.situation.value === item.situation}
            defaultSelected={
              defaultValues ? defaultValues.situation === item.situation : false
            }
            invalid={!inputs.situation.isValid}
          />
        )}
      />
      <Input
        label="SHAKING RECAP"
        textInputConfig={{
          placeholder: "Description",
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description,
          multiline: true,
          autoCorrect: false,
        }}
        style={{ height: 150 }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your input data
        </Text>
      )}
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
    fontFamily: FontFamily.regular,
  },
  date: {
    alignSelf: "stretch",
  },
  errorText: {
    textAlign: "center",
    color: Color.secondary400,
    margin: 8,
    fontFamily: FontFamily.regular,
  },
});
