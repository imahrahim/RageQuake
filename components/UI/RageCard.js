import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Color, FontSize, FontFamily } from "../../constants/GlobalStyles";

export default function RageCard({
  timestamp,
  title,
  id,
  intensity,
  trigger,
  situation,
}) {
  const navigation = useNavigation();

  let levelImage;
  

  switch (intensity) {
    case 1:
      levelImage = require("../../assets/CardLevels/CardLevels_Card1.png");
      break;
    case 2:
      levelImage = require("../../assets/CardLevels/CardLevels_Card2.png");
      break;
    case 3:
      levelImage = require("../../assets/CardLevels/CardLevels_Card3.png");
      break;
    case 4:
      levelImage = require("../../assets/CardLevels/CardLevels_Card4.png");
      break;
    case 5:
      levelImage = require("../../assets/CardLevels/CardLevels_Card5.png");
      break;
    case 6:
      levelImage = require("../../assets/CardLevels/CardLevels_Card6.png");
      break;
    case 7:
      levelImage = require("../../assets/CardLevels/CardLevels_Card7.png");
      break;
    case 8:
      levelImage = require("../../assets/CardLevels/CardLevels_Card8.png");
      break;
    case 9:
      levelImage = require("../../assets/CardLevels/CardLevels_Card9.png");
      break;
    case 10:
      levelImage = require("../../assets/CardLevels/CardLevels_Card10.png");
      break;
  }

  function ragePressHandler() {
    navigation.navigate("ManageRage", { rageId: id, itemData: title });
  }

  return (
    <Pressable
      onPress={ragePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <ImageBackground
        source={levelImage}
        style={styles.itemBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.item}>
          {/* Your existing content */}
          <Text style={styles.itemDate}>{timestamp}</Text>
          <Text style={styles.itemTitle}>{title}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary600,
  },
  contentContainer: {
    flex: 1,
    marginBottom: 25,
  },
  item: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    height: 130,
    width: "100%",
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: "space-around",
  },
  itemTitle: {
    fontFamily: FontFamily.blackItalic,
    fontSize: FontSize.sizeTitle,
    color: Color.primary600,
    alignSelf: "center",
  },
  itemDate: {
    fontSize: FontSize.sizeDate,
    color: Color.primary600,
    alignSelf: "flex-end",
    fontFamily: FontFamily.italic,
  },
  pressed: {
    opacity: 0.75,
  },

  itemBackground: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: Color.primary600,
  },
  imageStyle: {
    borderRadius: 10,
  },
});
