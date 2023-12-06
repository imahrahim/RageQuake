import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Color, FontSize } from "../constants/GlobalStyles";
import { useContext, useLayoutEffect } from "react";
import { RageContext } from "../store/rage-context";

export default function Measurements({ navigation, route }) {
 const rageCtx =  useContext(RageContext);

  const editedRageId = route.params?.rageId;
  const isEditing = !!editedRageId;

 function deleteRageHandler(){
  rageCtx.deleteRage(editedRageId)
  navigation.goBack()
 
 }

 function cancelHandler(){
  navigation.goBack()
 }

 function confirmHandler(){
  navigation.goBack()
 }

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.contentContainer}>
        <View style={styles.buttonContainer}>
        

<Pressable onPress={cancelHandler}>
              <Text style={styles.buttonText}>cancel</Text>
            </Pressable>
          <Pressable onPress={confirmHandler}>
            <Text style={styles.buttonText}>{isEditing? 'update' : 'add'}</Text>
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
      {isEditing && (
            <Pressable  style={styles.buttonDelete} onPress={deleteRageHandler}>
              <Text style={styles.buttonText}>delete</Text>
            </Pressable>
          )}
    </ScrollView>
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
  buttonText: {
    color: Color.primary600,
  },
  text: {
    color: Color.primary600,
    fontSize: FontSize.sizeTitle,
    fontWeight: "bold",
  },
  manageContainer: {
    flex: 1,
    marginVertical: 30,
  },
  buttonDelete: {
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 8,
    width: 150,
    borderTopColor: Color.primary600,
    borderTopWidth: 1,
  }
});
