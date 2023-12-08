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
import { useContext } from "react";
import { RageContext } from "../store/rage-context";

import RageForms from "../components/ManageRage/RageForms";
import { storeRage } from "../util/http";

export default function ManageRage({ navigation, route }) {
  const rageCtx = useContext(RageContext);

  const editedRageId = route.params?.rageId;
  const isEditing = !!editedRageId;

  const selectedRage = rageCtx.rageQuakes.find(
    (rage) => rage.id === editedRageId
  );

  function deleteRageHandler() {
    rageCtx.deleteRage(editedRageId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(rageData) {
    if (isEditing) {
      rageCtx.updateRage(editedRageId, rageData);
    } else {
      rageCtx.addRage(rageData);
      storeRage(rageData)
    }

    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container}>
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
        <Pressable style={styles.buttonDelete} onPress={deleteRageHandler}>
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
    marginBottom: 80,
    borderTopColor: Color.primary600,
    borderTopWidth: 1,
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
});
