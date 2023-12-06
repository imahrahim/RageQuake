import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native'

import { Color, FontSize } from '../../constants/GlobalStyles';
import RageCard  from './RageCard'
import data from "../../data/data";

function renderRageItem({item}){
  return <RageCard {...item} />
}


export default function RageList({ rageQuakes }) {
  return (
    <View style={styles.container}>
    <SafeAreaView style={styles.contentContainer}>
      <FlatList
        data={rageQuakes}
        renderItem={renderRageItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary600,
  },
  contentContainer: {
    flex: 1,
    marginVertical: 75,
    marginHorizontal: 20,
  },
  text: {
    color: Color.primary200,
    fontSize: FontSize.sizeTitle
  }
});
