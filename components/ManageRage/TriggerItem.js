import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useState } from 'react';

import { Color, FontSize } from '../../constants/GlobalStyles'


export default function TriggerItem({ triggers, onSelect }) {
  const [selected, setSelected] = useState(false);

  const handlePress = () => {
    setSelected(!selected);
    onSelect(triggers);
  };

  return (
    <Pressable onPress={handlePress}>
      <View
        style={[
          styles.intensityButton,
        ]}
      >
        <Text
          style={[
            styles.number,
            { fontWeight: selected ? 'bold' : 'regular' },
          ]}
        >
          {triggers.trigger}
        </Text>
      </View>
    </Pressable>
  );
}

  const styles = StyleSheet.create({
    intensityButton: {
        marginHorizontal: 20,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }, number: {
        color: Color.primary600,
        fontSize: FontSize.sizeOptions
    }
})