import React from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Color, FontSize } from "../../constants/GlobalStyles";


export default function RageCard({ timestamp, title, id, intensity, trigger, situation }) {
const navigation = useNavigation();

  function ragePressHandler(){
    console.log('Navigating to AddRage with rageId:', id);
    navigation.navigate('ManageRage', { rageId: id, itemData: title})
  }


  return (
    <Pressable onPress={ragePressHandler} style={({pressed}) => pressed  && styles.pressed}>
    <View style={styles.item}>
        {/* Image Card Intensity if statement*/}
      <Text style={styles.itemDate}>{timestamp}</Text>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemTitle}>{intensity}</Text>
      <Text style={styles.itemTitle}>{trigger}</Text>
      <Text style={styles.itemTitle}>{situation}</Text>
    </View>
    </Pressable>
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
  pressed:{
    opacity:0.75
  }
});
