import React, { useState } from 'react';
import { View, Pressable, Text, StyleSheet, Platform } from 'react-native';
import { Color, FontFamily } from '../../constants/GlobalStyles';

const AddButton = ({ onPress }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <View style={styles.addButton}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => (pressed ? styles.pressed : null)}
      >
        <Text style={isPressed ? styles.textPressed : styles.text}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Color.primary200,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  text: {
    color: Color.primary600,
    fontSize: 40,
    fontFamily: FontFamily.regular,
  },
  textPressed: {
    color: Color.primary600,
    fontSize: 48,
    fontFamily: FontFamily.regular,
  },
});

export default AddButton;
