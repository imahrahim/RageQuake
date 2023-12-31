import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";


const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();


import { Color, FontSize } from "./constants/GlobalStyles";
import Measurements from "./screens/Measurements";
import Analysis from "./screens/Analysis";
import ManageRage from "./screens/ManageRage";
import AddButton from "./components/UI/AddButton";
import RageContextProvider from "./store/rage-context";

function RageQuake( {navigation}) {
  const [fontsLoaded] = useFonts({
    "SuisseScreen-bold": require("./assets/fonts/SuisseScreen-Bold.ttf"),
    "SuisseScreen-boldItalic": require("./assets/fonts/SuisseScreen-BoldItalic.ttf"),
    "SuisseScreen-monitor": require("./assets/fonts/SuisseScreen-Monitor.ttf"),
    "SuisseScreen- monitorItalic": require("./assets/fonts/SuisseScreen-MonitorItalic.ttf"),
  });

  if (!fontsLoaded) {
    console.log("Fonts not loaded");
    return <AppLoading />;
  }

  console.log("Fonts loaded:", fontsLoaded);

  return (
    <>
    <BottomTabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 30,
          right: 100,
          height: 50,
          elevation: 0,
          borderTopColor: Color.primary200,
          backgroundColor: Color.primary600,
        },
      }}
    >
      <BottomTabs.Screen
        name="Measurements"
        component={Measurements}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: Platform.OS === 'ios' ? 20 : 0, // Add top: 20 for iOS
              }}
            >
              <Text style={{ ...styles.navigationText }}>MEASUREMENTS</Text>
            </View>
          ),
        }}
      />
      <BottomTabs.Screen
        name="Analysis"
        component={Analysis}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: Platform.OS === 'ios' ? 20 : 0,
              }}
            >
              <Text style={{ ...styles.navigationText }}>ANALYSIS</Text>
            </View>
          ),
        }}
      />
      
    </BottomTabs.Navigator>
     <AddButton  onPress={() => navigation.navigate('ManageRage')}  />
     </>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
    <>
      <StatusBar style="light" />
      <RageContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="RageQuake"
            component={RageQuake}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ManageRage"
            component={ManageRage}
            options={{ headerShown: false, presentation: 'modal' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </RageContextProvider>
    </>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: Color.primary600,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    elevation: 5,
  },
  navigationText: {
    fontStyle: 'italic',
    fontSize: FontSize.sizeMenu,
    color: Color.primary200
  },
  container: {
    flex: 1,
    backgroundColor: Color.primary600,
  },
});
