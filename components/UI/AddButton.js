import { View, Pressable, Text, StyleSheet} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

import { Color } from '../../constants/GlobalStyles';

const AddButton = ({ onPress }) => {
    return (
      <View style={styles.addButton}>
      <Pressable onPress={onPress} style={({pressed}) => pressed  && styles.pressed}>
       <Text style={styles.text}>+</Text>
      </Pressable>
      </View>
    );
  };

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        bottom: 50,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Color.primary200,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
          ios: {
            shadowColor: 'black',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.5,
            shadowRadius: 5,
          },
          android: {
            elevation: 5,
          },
        }),
      },
      pressed: {
        opacity: 0.75,
      },
      text: {
        color: Color.primary600,
        fontSize: 40,
      }
  });


  export default AddButton