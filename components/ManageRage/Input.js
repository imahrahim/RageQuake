import { View, TextInput, Text, StyleSheet } from "react-native";
import React from "react";

import { Color, FontSize, Margin, Padding , FontFamily} from "../../constants/GlobalStyles";

export default function Input({ label, textInputConfig }) {

    let inputStyles = [styles.textInput]

    if (textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputMultiline)
    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  title: {
    color: Color.primary600,
    fontSize: FontSize.sizeTitle,
    fontFamily: FontFamily.black
  },
  textInput: {
    borderColor: Color.primary600,
    borderWidth: 0.5,
    borderRadius: 30,
    padding: Padding.paddingText,
    marginVertical: Margin.marginContentVerticla,
    color: Color.primary600,
    fontSize: FontSize.sizeDescription,
    fontFamily: FontFamily.regular
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
    padding: Padding.paddingText,
    marginVertical: Margin.marginContentVerticla,
    borderRadius: 10,
  }
});
