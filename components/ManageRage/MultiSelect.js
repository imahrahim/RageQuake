// MultipleSelection.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
     <LinearGradient
        style={{ position: "absolute", right: 0, width: 20, height: '100%' }}
        colors={["#ffffd700", Color.primary200]}
        locations={[0.2, 1]}
        pointerEvents={"none"}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      />
      <LinearGradient
        style={{ position: "absolute", left: 0, width: 15, height: '100%'}}
        colors={[Color.primary200, '#ffffd700']}
        locations={[0.2, 1]}
        pointerEvents={"none"}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
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
    zIndex: 1
  },
  invalidLabel: {
    color: Color.secondary400,
    fontFamily: FontFamily.black
  },
});

export default MultipleSelection;
