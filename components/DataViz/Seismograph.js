import React, { Fragment, useContext } from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import Svg, { Text, Path, Line } from "react-native-svg";
import moment from "moment";
import { Color, FontFamily } from "../../constants/GlobalStyles";
import { RageContext } from "../../store/rage-context"; // Import your context

function compareDates(a, b) {
  return moment(a).isSame(b, "day");
}

const Seismograph = () => {
  const rageCtx = useContext(RageContext);

  const sortedData = rageCtx.rageQuakes.sort(
    (a, b) =>
      moment(a.timestamp, "YYYY-MM-DDTHH:mm:ss.SSSZ") -
      moment(b.timestamp, "YYYY-MM-DDTHH:mm:ss.SSSZ")
  );

  // console.log('sortedData',sortedData)

  const dayStep = 100;
  const windowDimensions = useWindowDimensions();
  const chartWidth = windowDimensions.width / 3;
  const chartHeight = sortedData.length * dayStep;
  const xOffset = windowDimensions.width / 2 + 30;
  const yOffset = -5;
  const ySpace = 50;

  const timestamps = sortedData.map((item) =>
    moment(item.timestamp, "YYYY-MM-DDTHH:mm:ss.SSSZ")
  );

  //console.log('timestamps', timestamps)

  const intensities = sortedData.map((item) => item.intensity);

  // console.log('intensities', intensities)

  const startDate = moment("05.11.2023", "DD.MM.YYYY");
  const endDate = moment();

  const yStep = 1 / 4;
  const scaleX = chartWidth / 10;

  let pathString = "";

  const coordinates = [];
  const textCoordinates = [];

  const intensityMap = {};
  sortedData.forEach((item) => {
    const date = moment(item.timestamp, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
      "YYYY-MM-DD"
    );
    intensityMap[date] = item.intensity;
  });

  for (
    let date = startDate.clone();
    date.isSameOrBefore(endDate);
    date.add(1, "day")
  ) {
    const x1 = xOffset;
    const y1 =
      (date.diff(endDate, "days") - yStep * 4) *
        (chartHeight / startDate.diff(endDate, "days")) +
      ySpace;

    const intensity = intensityMap[date.format("YYYY-MM-DD")];
    const x2 = xOffset + (intensity || 0) * scaleX;
    const y2 =
      (date.diff(endDate, "days") - yStep * 3) *
        (chartHeight / startDate.diff(endDate, "days")) +
      ySpace;

    const x3 = xOffset - (intensity || 0) * scaleX;
    const y3 =
      (date.diff(endDate, "days") - yStep * 2) *
        (chartHeight / startDate.diff(endDate, "days")) +
      ySpace;

    const x4 = xOffset;
    const y4 =
      (date.diff(endDate, "days") - yStep * 1) *
        (chartHeight / startDate.diff(endDate, "days")) +
      ySpace;

    if (pathString === "") {
      pathString += `M${x1},${y1}`;
    } else {
      pathString += ` L${x2},${y2} L${x3},${y3} L${x4},${y4}`;
    }
    if (intensity !== undefined) {
      const yText = y2; // or choose another suitable y-coordinate
      textCoordinates.push({ x: x2, y: yText });
    }
    coordinates.push({ x4, y4 });
  }

  pathString += ` L${xOffset},${yOffset}`;

  const strokeWidth = 0.2;

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
          {textCoordinates.map((coordinate, index) => (
            <Fragment key={index}>
              {timestamps[index] && timestamps[index].isValid() && (
                <Text
                  x={20}
                  y={coordinate.y+4}
                  fontSize="12"
                  fontWeight="bold"
                  fill={Color.primary200}
                >
                  {timestamps[index].format("DD.MM.YYYY")}
                </Text>
              )}
            </Fragment>
          ))}

          {coordinates.map((coord, index) => (
            <Line
              key={index}
              x1={coord.x4 - 150}
              y1={coord.y4}
              x2={coord.x4 + 150}
              y2={coord.y4}
              stroke={Color.primary200_20}
              strokeWidth={strokeWidth}
            />
          ))}
          <Fragment>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((scaleIndex) => (
              <Line
                key={scaleIndex}
                x1={xOffset + scaleX * scaleIndex}
                y1={dayStep * yStep}
                x2={xOffset + scaleX * scaleIndex}
                y2={chartHeight + ySpace + 30}
                stroke={Color.primary200_20}
                strokeWidth={strokeWidth}
              />
            ))}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((scaleIndex) => (
              <Line
                key={scaleIndex}
                x1={xOffset - scaleX * scaleIndex}
                y1={dayStep * yStep * 2}
                x2={xOffset - scaleX * scaleIndex}
                y2={chartHeight + ySpace + 30}
                stroke={Color.primary200_20}
                strokeWidth={strokeWidth}
              />
            ))}
          </Fragment>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((scaleIndex) => (
            <Text
              key={scaleIndex}
              x={xOffset + scaleX * scaleIndex}
              y="30"
              fontSize="10"
              fontWeight="italic"
              fill={Color.primary200}
              textAnchor="middle"
            >
              {scaleIndex}
            </Text>
          ))}
          <Text
            x={xOffset + scaleX * 5.5}
            y="15"
            fontSize="10"
            fontStyle="italic"
            fill={Color.primary200}
            textAnchor="middle"
          >
            INTENSITY LEVEL
          </Text>
          <Text
            x={20}
            y="15"
            fontSize="10"
            fontStyle="italic"
            fill={Color.primary200}
            textAnchor="left"
          >
            SEISMIC
          </Text>
          <Text
            x={20}
            y="30"
            fontSize="10"
            fontStyle="italic"
            fill={Color.primary200}
            textAnchor="left"
          >
            SCHEDULE
          </Text>
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
    marginTop: 30,
    paddingBottom: 100,
    paddingTop: 20,
  },
});

export default Seismograph;
