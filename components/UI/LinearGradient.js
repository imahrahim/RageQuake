import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Color } from '../../constants/GlobalStyles'

export default function Gradient() {
  return (
    <View>
            <LinearGradient
        style={{ position: "absolute", right: 0, width: 40, height: '100%' }}
        colors={["#ffffd700", Color.primary200]}
        locations={[0.2, 1]}
        pointerEvents={"none"}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      />
      <LinearGradient
        style={{ position: "absolute", left: 0, width: 40, height: '100%'}}
        colors={[Color.primary200, '#ffffd700']}
        locations={[0.2, 1]}
        pointerEvents={"none"}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      />
    </View>
  )
}