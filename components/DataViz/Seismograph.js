import React, { Fragment } from "react";
import { View, useWindowDimensions } from "react-native";
import Svg, { Text, Path } from "react-native-svg";
import moment from "moment";
import data from "../../data/data";
import { Color } from "../../constants/GlobalStyles";

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
    const x1 =
    dataIndex !== -1 ? xOffset : xOffset;
  const y1 =
    (date.diff(startDate, "days") + (yStep )) *
    (chartHeight / endDate.diff(startDate, "days"));
  const x2 =
    dataIndex !== -1 ? xOffset + intensities[dataIndex] * scaleX : xOffset;
  const y2 =
    (date.diff(startDate, "days") + (yStep *2)) *
    (chartHeight / endDate.diff(startDate, "days"));
  const x3 =
    dataIndex !== -1 ? xOffset - intensities[dataIndex] * scaleX : xOffset;
  const y3 =
    (date.diff(startDate, "days") + (yStep *3)) *
    (chartHeight / endDate.diff(startDate, "days"));
  const x4 =
    dataIndex !== -1 ? xOffset : xOffset;
  const y4 =
    (date.diff(startDate, "days") + (yStep *4)) *
    (chartHeight / endDate.diff(startDate, "days"));

  if (pathString === "") {
    pathString += `M${x1},${y1}`;
  } else {
    pathString += ` L${x2},${y2} L${x3},${y3} L${x4},${y4}`;
  }
}


  return (
    <View style={{ flex: 1 }}>
      <Svg width="100%" height="100%">
        <Path
          d={pathString}
          strokeWidth={2}
          stroke={Color.primary200}
          fill="none"
        />
      </Svg>
    </View>
  );
};

export default Seismograph;
