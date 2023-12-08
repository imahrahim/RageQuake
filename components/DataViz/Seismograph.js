import React, { Fragment } from "react";
import { View, useWindowDimensions, StyleSheet, ScrollView } from "react-native";
import Svg, { Text, Path } from "react-native-svg";
import moment from "moment";
import data from "../../data/data";
import { Color, FontFamily } from "../../constants/GlobalStyles";

const Seismograph = () => {
  const sortedData = data.sort(
    (a, b) =>
      moment(a.timestamp, "DD.MM.YYYY HH:mm") -
      moment(b.timestamp, "DD.MM.YYYY HH:mm")
  );

  const dayStep = 20;
  const windowDimensions = useWindowDimensions();
  const chartWidth = windowDimensions.width / 2.5;
  const chartHeight = sortedData.length * dayStep;
  const xOffset = windowDimensions.width / 2;

  // Extract timestamps and intensities
  const timestamps = sortedData.map((item) =>
    moment(item.timestamp, "DD.MM.YYYY HH:mm")
  );
  const intensities = sortedData.map((item) => item.intensity);

  const startDate = moment("01.11.2023", "DD.MM.YYYY");
  const endDate = moment();

  const yStep = 1 / 4;
  const scaleX = chartWidth / 10;

  // Create a path string for the continuous timeline
  let pathString = "";

  const coordinates = [];

  // Iterate through each day within the date range
  for (
    let date = startDate.clone();
    date.isSameOrBefore(endDate);
    date.add(1, "day")
  ) {
    const dataIndex = timestamps.findIndex((timestamp) =>
      timestamp.isSame(date, "day")
    );

   

    // Calculate X and Y positions
    const x1 = dataIndex !== -1 ? xOffset : xOffset;
    const y1 =
      (date.diff(endDate, "days") - yStep * 4) *
      (chartHeight / startDate.diff(endDate, "days"));
    const x2 =
      dataIndex !== -1 ? xOffset + intensities[dataIndex] * scaleX : xOffset;
    const y2 =
      (date.diff(endDate, "days") - yStep * 3) *
      (chartHeight / startDate.diff(endDate, "days"));
    const x3 =
      dataIndex !== -1 ? xOffset - intensities[dataIndex] * scaleX : xOffset;
    const y3 =
      (date.diff(endDate, "days") - yStep * 2) *
      (chartHeight / startDate.diff(endDate, "days"));
    const x4 = dataIndex !== -1 ? xOffset : xOffset;
    const y4 =
      (date.diff(endDate, "days") - yStep * 1) *
      (chartHeight / startDate.diff(endDate, "days"));

    if (pathString === "") {
      pathString += `M${x1},${y1}`;
    } else {
      pathString += ` L${x2},${y2} L${x3},${y3} L${x4},${y4}`;
    }

    
 coordinates.push({ x1, y1 });
  }






  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
      <Svg width="100%" height="100%">
        <Path
          d={pathString}
          strokeWidth={2}
          stroke={Color.primary200}
          fill="none"
        />
            {coordinates.map((coord, index) => (
          <Text
            key={index}
            x={coord.x1 + 5} 
            y={coord.y1 + 15} 
            fontSize="10"
            fill="red"
            fontFamily={FontFamily.italic}
          >
            Day {index + 1}
          </Text>
        ))}
      </Svg>
      </View>
    </View>
  );
};

const styles= StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor:Color.primary600 
  },
  scrollContainer: {
    marginTop: 50,
  },
})

export default Seismograph;
