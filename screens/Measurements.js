import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native'

import { Color , FontSize} from '../constants/GlobalStyles';
import RageCard from '../components/UI/RageCard';

export default function Measurements() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.contentContainer}>
      <RageCard />
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
    margin: 50
  },
  text: {
    color: Color.primary200,
    fontSize: FontSize.sizeTitle
  }
});
