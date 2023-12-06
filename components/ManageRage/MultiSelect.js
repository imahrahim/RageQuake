import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import IntensityItem from './IntensityItem';

import { Color, FontSize, Padding, Margin } from '../../constants/GlobalStyles';

const intensityData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((intensity) => ({
    id: intensity,
    intensity: intensity,
  }));
  

export default function MultiSelect({ label }) {
    const renderIntensityItem = ({ item }) => <IntensityItem intensityData={item} />;


  return (
    <View style={styles.container}>
      <Text style={styles.title}>INTENSITY RICHTER</Text>
      <FlatList
        data={intensityData}
        renderItem={renderIntensityItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
      />
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
    fontWeight: 'bold',
  },
  textInput: {
    borderColor: Color.primary600,
    borderWidth: 0.5,
    borderRadius: 30,
    padding: Padding.paddingText,
    marginVertical: Margin.marginContentVerticla,
    color: Color.primary600,
    fontSize: FontSize.sizeDescription,
  },
});
