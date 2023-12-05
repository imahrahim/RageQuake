import React from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image } from "react-native";
import { Color, FontSize } from "../../constants/GlobalStyles";
import data from "../../data/data";

export default function RageCard() {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
        {/* Image Card Intensity if statement*/}
      <Text style={styles.itemDate}>{item.timestamp}</Text>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemTitle}>{item.intensity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.contentContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary600,
  },
  contentContainer: {
    flex: 1,
    marginBottom: 25,
  },
  item: {
    backgroundColor: Color.primary200,
    paddingHorizontal: 10,
    height: 130,
    width: '100%',
    marginVertical: 8,
    borderRadius: 10,
    justifyContent: 'space-around', 
  },
  itemTitle: {
    fontSize: FontSize.sizeTitle,
    color: Color.primary600,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  itemDate: {
    fontSize: FontSize.sizeDate,
    color: Color.primary600,
    alignSelf: 'flex-end'
  },
});
