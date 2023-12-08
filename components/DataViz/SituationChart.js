import React, { Fragment } from "react";
import { View, useWindowDimensions } from "react-native";
import Svg, { Circle, Text, Rect } from "react-native-svg";

import data from "../../data/data";
import situations from "../../data/situation";

import { Color, FontFamily } from "../../constants/GlobalStyles";

const SituationChart = () => {
  const totalDataCount = data.length;

  const situationCounts = situations.reduce((counts, situationOption) => {
    const { situation } = situationOption;
    const count = data.filter((item) => item.situation === situation).length;
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
  const centerY = windowDimensions.height / 3;

  return (
    <View style={{ flex: 1, backgroundColor: Color.primary600 }}>
      <Svg width="100%" height="100%">
        {situationData.map((item, index) => {
          const percentage = (item.count / totalDataCount) * 100;
          const strokeWidth = (percentage / 100) * 50; // Adjust the multiplier for desired thickness

          return (
            <Fragment key={index}>
              <Rect
                x={centerX}
                y={centerY + 15 + index * 15}
                width="100%"
                height="15"
                fill={Color.primary600}
              />
              <Circle
                cx={centerX}
                cy={centerY}
                r={index * 15}
                fill="none"
                strokeWidth={strokeWidth}
                stroke={Color.primary200_80}
              />
              <Text
                y={centerY + 20 + index * 15}
                x={centerX }
                fontSize="12"
                fill={Color.primary200}
                textAnchor="left"
                fontStyle='italic'
              >
                 {item.situation} { }
                {percentage.toFixed(0)}%
              </Text>
            </Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

export default SituationChart;
