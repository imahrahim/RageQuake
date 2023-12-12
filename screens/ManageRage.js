import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Color, FontSize, FontFamily } from "../constants/GlobalStyles";
import { useContext, useState } from "react";
import { RageContext } from "../store/rage-context";
import { LinearGradient } from "expo-linear-gradient";

import RageForms from "../components/ManageRage/RageForms";
import { deleteRages, storeRage, updateRages } from "../util/http";

export default function ManageRage({ navigation, route }) {
  const rageCtx = useContext(RageContext);

  const editedRageId = route.params?.rageId;
  const isEditing = !!editedRageId;

  const selectedRage = rageCtx.rageQuakes.find(
    (rage) => rage.id === editedRageId
  );

  async function deleteRageHandler() {
    if (editedRageId) {
      await deleteRages(editedRageId);
      rageCtx.deleteRage(editedRageId);
      navigation.goBack();
    } else {
      console.error("Invalid rage id");
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(rageData) {
    try {
      if (isEditing) {
        await updateRages(editedRageId, rageData);
        rageCtx.updateRage(editedRageId, rageData);
      } else {
        const id = await storeRage(rageData);
        rageCtx.addRage({ ...rageData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      console.error("Error updating rage:", error);
      // Handle the error as needed
    }
  }

  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };


  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.contentContainer}>
        <View style={styles.manageContainer}>
          <RageForms
            onCancel={cancelHandler}
            submitButtonLabel={isEditing ? "update" : "add"}
            onSubmit={confirmHandler}
            defaultValues={selectedRage}
          />
        </View>
      </SafeAreaView>
      {isEditing && (
        <Pressable onPressIn={handlePressIn}
        onPressOut={handlePressOut}
         onPress={deleteRageHandler}
         style={styles.buttonDelete}
         >
          <Text style={isPressed ? styles.textPressed : styles.buttonText}>delete</Text>
        </Pressable>
      )}

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
    margin: 25,
  },
  text: {
    color: Color.primary600,
    fontSize: FontSize.sizeTitle,
    fontFamily: FontFamily.black,
  },
  manageContainer: {
    flex: 1,
    marginVertical: 30,
  },
  buttonDelete: {
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 8,
    width: 150,
    marginBottom: 38,
    borderTopColor: Color.primary600,
    borderTopWidth: 1,
    position: "absolute",
    bottom: 0,
    backgroundColor: Color.primary200,
  },
  textInput: {
    borderColor: Color.secondary600,
    fontFamily: FontFamily.black,
    borderWidth: 3,
    height: 80,
  },
  buttonText: {
    color: Color.primary600,
    fontFamily: FontFamily.regular,
  },
  textPressed: {
    color: Color.primary600,
    fontFamily: FontFamily.black,
  },
});
