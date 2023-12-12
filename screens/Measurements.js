import React, { useContext, useEffect, useState } from "react";
import { RageContext } from "../store/rage-context";
import { fetchRage } from "../util/http";
import { Text, StyleSheet, View } from "react-native";
import RageList from "../components/UI/RageList";
import { LinearGradient } from 'expo-linear-gradient';
import { Color } from "../constants/GlobalStyles";


function Measurements() {
  const rageContext = useContext(RageContext);

  useEffect(() => {
    async function getRages() {
      try {
        const rages = await fetchRage();
        // console.log("Fetched rages:", rages);
        rageContext.setRages(rages);
      } catch (error) {
        // console.error("Error fetching rages:", error);
      }
    }
  
    // console.log("Calling getRages...");
    getRages();
  }, [rageContext]);
  


  return (
    <RageList
      rageQuakes={rageContext.rageQuakes}
      fallbackText="No RageQuakes found!"
    />
  );
}

export default Measurements;
