import React, { Fragment } from "react";
import { View, useWindowDimensions } from "react-native";
import Svg, { Line, Circle, Text, Path } from "react-native-svg";
import moment from "moment"; // Import the moment library to handle timestamps

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

  const days = Array.from(
    new Set(timestamps.map((timestamp) => timestamp.format("DD.MM.YYYY")))
  );

  const yStep = 1 / 3;
  console.log("yStep", yStep);

  const scaleX = chartWidth / 10;

  console.log(scaleX);

  return (
    <View style={{ flex: 1 }}>
      <Svg width="100%" height="100%">
        {timestamps.map((timestamp, index) => (
          <Fragment key={index}>
            <Path
              d={`M${xOffset},${index * (chartHeight / timestamps.length)} L${
                xOffset + intensities[index] * scaleX
              },${(index + yStep) * (chartHeight / timestamps.length)} L${
                xOffset - intensities[index] * scaleX
              },${
                (index + yStep * 2) * (chartHeight / timestamps.length)
              } L${xOffset},${
                (index + yStep * 3) * (chartHeight / timestamps.length)
              }`}
              strokeWidth={2}
              stroke={Color.primary200}
              fill="none"
            />
            <Text
              x={5}
              y={index * (chartHeight / timestamps.length) + 15}
              fontSize="10"
              fill="#000000"
            >
              {timestamp.format("DD.MM.YYYY HH:mm")}
            </Text>
          </Fragment>
        ))}
      </Svg>
    </View>
  );
};

export default Seismograph;

// {index > 0 && (
//   <Line
//     x1={xOffset}
//     y1={index * (chartHeight / timestamps.length)}
//     x2={xOffset + intensities[index] * scaleX}
//     y2={(index + yStep) * (chartHeight / timestamps.length)}
//     strokeWidth={2}
//     stroke={Color.primary200}
//   />
// )}
//    {index > 0 && (
//   <Line
//     x1={xOffset + intensities[index] * scaleX}
//     y1={(index + yStep) * (chartHeight / timestamps.length)}
//     x2={xOffset - intensities[index] * scaleX}
//     y2={(index+ (yStep*2)) * (chartHeight / timestamps.length)}
//     strokeWidth={2}
//     stroke={Color.primary200}
//   />
// )}
//    {index > 0 && (
//   <Line
//     x1={xOffset - intensities[index] * scaleX}
//     y1={(index + (yStep*2)) * (chartHeight / timestamps.length)}
//     x2={xOffset}
//     y2={(index + (yStep*3))  * (chartHeight / timestamps.length)}
//     strokeWidth={2}
//     stroke={Color.primary200}
//   />
// )}
