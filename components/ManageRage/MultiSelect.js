// MultipleSelection.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { Color, FontSize, Margin } from '../../constants/GlobalStyles';

const MultipleSelection = ({ label, data, renderItem }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{label}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
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
    fontWeight: 'bold',
    marginBottom: Margin.marginContentVerticla,
  },
});

export default MultipleSelection;
