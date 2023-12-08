import React, { Fragment, useContext } from "react";
import { View, useWindowDimensions, StyleSheet, ScrollView } from "react-native";
import Svg, { Text, Path, Line } from "react-native-svg";
import moment from "moment";
import { Color, FontFamily } from "../../constants/GlobalStyles";
import { RageContext } from "../../store/rage-context"; // Import your context

const Seismograph = () => {
  const rageCtx = useContext(RageContext); // Access the context

  const sortedData = rageCtx.rageQuakes.sort(
    (a, b) =>
      moment(a.timestamp, "DD.MM.YYYY HH:mm") -
      moment(b.timestamp, "DD.MM.YYYY HH:mm")
  );

  const dayStep = 50;
  const windowDimensions = useWindowDimensions();
  const chartWidth = windowDimensions.width / 3;
  const chartHeight = sortedData.length * dayStep;
  const xOffset = windowDimensions.width / 2 + 30;
  const yOffset = -5;

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

    coordinates.push({ x4, y4 });
  }

  pathString += ` L${xOffset},${yOffset}`;

  const strokeWidth = 0.5;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Svg width={windowDimensions.width} height={chartHeight + 100}>
          <Path
            d={pathString}
            strokeWidth={2}
            stroke={Color.primary200}
            fill="none"
          />
          {coordinates.map((coord, index) => (
            <Text
              key={index}
              x={25}
              y={coord.y4- dayStep*0.25}
              fontSize="10"
              fill={Color.primary200}
              fontFamily={FontFamily.italic}
            >
              Datum
            </Text>
          ))}
             {coordinates.map((coord, index) => (
            <Line
              key={index}
              x1={coord.x4 -150}
                y1={coord.y4}
                x2={coord.x4 + 150}
                y2={coord.y4 }
                stroke={Color.primary200_20}
                strokeWidth={strokeWidth}
           />
          ))}
          <Fragment>
          {[0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((scaleIndex) => (
              <Line
                key={scaleIndex}
                x1={xOffset + scaleX * scaleIndex}
                y1="0"
                x2={xOffset + scaleX * scaleIndex}
                y2={chartHeight + 30}
                stroke={Color.primary200_20}
                strokeWidth={strokeWidth}
              />
              ))}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((scaleIndex) => (
              <Line
                key={scaleIndex}
                x1={xOffset - scaleX * scaleIndex}
                y1="0"
                x2={xOffset - scaleX * scaleIndex}
                y2={chartHeight + 30}
                stroke={Color.primary200_20}
                strokeWidth={strokeWidth}
              />
              ))}
          </Fragment>
        </Svg>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary600,
  },
  scrollContainer: {
    marginBottom: 75,
    marginTop: 100,
    paddingBottom: 100,
    paddingTop:20,
  },
});

export default Seismograph;
