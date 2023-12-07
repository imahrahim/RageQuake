import { useContext } from "react";
import RageList from '../components/UI/RageList'
import { RageContext } from "../store/rage-context";
import { Text, StyleSheet } from "react-native";
import { Color, FontSize } from "../constants/GlobalStyles";

function Measurements() {
  const rageCtx = useContext(RageContext);

  return (
    <RageList rageQuakes={rageCtx.rageQuakes} fallbackText="No RageQuakes found!" />
  );
}

export default Measurements;
