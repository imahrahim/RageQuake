// MultipleSelection.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { Color, FontSize, Margin, FontFamily } from '../../constants/GlobalStyles';

const MultipleSelection = ({ label, data, renderItem, invalid }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title,  invalid && styles.invalidLabel,] }>{label}</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => renderItem({ item, invalid })}
        keyExtractor={(item) => item.id}
        horizontal={true}
    
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  title: {
    color: Color.primary600,
    fontSize: FontSize.sizeTitle,
    fontFamily: FontFamily.black,
    marginBottom: Margin.marginContentVerticla,
  },
  invalidLabel: {
    color: Color.secondary400,
    fontFamily: FontFamily.black
  },
});

export default MultipleSelection;
