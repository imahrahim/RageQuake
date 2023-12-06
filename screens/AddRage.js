import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Color, FontSize } from "../constants/GlobalStyles";
import { useLayoutEffect } from "react";

export default function Measurements({navigation, route}) {
 const editedRageId = route.params?.rageId;
 const isEditing = !!editedRageId;


  
  return (
    <View style={styles.container}>
       <StatusBar style="dark" />
      <SafeAreaView style={styles.contentContainer}>

        <View style={styles.buttonContainer}>
          <Pressable onPress={()=> navigation.goBack()}>
            <Text style={styles.buttonText}>close</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.buttonText}>save</Text>
          </Pressable>
        </View>
        
        <View style={styles.manageContainer}>
        <Text style={styles.text}>RageQuake</Text>
        </View>
        <View style={styles.manageContainer}>
        <Text style={styles.text}>Intensity</Text>
        </View>
        <View style={styles.manageContainer}>
        <Text style={styles.text}>Trigger</Text>
        </View>
        <View style={styles.manageContainer}>
        <Text style={styles.text}>Situation</Text>
        </View>
        <View style={styles.manageContainer}>
        <Text style={styles.text}>Description</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary200,
  },
  contentContainer: {
    flex: 1,
    margin: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText:{
    color: Color.primary600,
  }, 
  text: {
    color: Color.primary600,
    fontSize: FontSize.sizeTitle,
    fontWeight: 'bold',
  },
  manageContainer: {
    flex: 1,
    marginVertical: 30,
  }
});
