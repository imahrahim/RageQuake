import React, { Fragment } from "react";
import { View, useWindowDimensions } from "react-native";
import Svg, { Circle, Text, Rect } from "react-native-svg";

import data from "../../data/data";
import situations from "../../data/situation";

import { Color } from "../../constants/GlobalStyles";

const SituationChart = () => {
  const situationCounts = situations.reduce((counts, situationOption) => {
    const { situation } = situationOption;
    const count = data.filter((item) => item.situation=== situation).length;
    counts[situation] = count;
    return counts;
  }, {});

  const situationData = Object.entries(situationCounts).map(([situation, count]) => ({
    situation,
    count,
  }));

  situationData.sort((a, b) => b.count - a.count);

  console.log("situationData:", situationData);

  const windowDimensions = useWindowDimensions();
  const centerX = windowDimensions.width / 2;
  const centerY = windowDimensions.height / 4
  return (
    <View style={{ flex: 1 }}>
      <Svg width="100%" height="100%">
        {situationData.map((item, index) => (
          <Fragment key={index}>
            <Rect
              x={centerX}
              y={centerY + 15 + index * 15}
              width="100%"
              height="15"
              fill={Color.primary200}
            />
            <Circle
              cx={centerX}
              cy={centerY}
              r={index * 15}
              fill="none"
              strokeWidth={item.count * 3}
              stroke={Color.primary200_80}
            />
            <Text
              y={centerY + 15 + index * 15}
              x={centerX}
              fontSize="12"
              fill={Color.primary600}
              textAnchor="left"
            >
              {item.situation}
            </Text>
          </Fragment>
        ))}
      </Svg>
    </View>
  );
};

export default SituationChart;
