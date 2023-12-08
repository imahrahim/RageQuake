import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import RageCard from './RageCard';

import { Color, FontSize, FontFamily } from '../../constants/GlobalStyles';

export default function RageList({ rageQuakes, fallbackText }) {
  if (rageQuakes.length === 0) {
    return <Text style={styles.infoText}>{fallbackText}</Text>;
  }

  const renderRageItem = ({ item }) => <RageCard {...item} />;

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
  );
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
  infoText: {
    color: Color.primary200,
    fontSize: FontSize.sizeDescription,
    fontFamily: FontFamily.regular,
    textAlign: 'center',
    margin: 32,
  },
});
