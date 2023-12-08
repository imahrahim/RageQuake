import React, { Fragment, useContext } from "react";
import { View, useWindowDimensions } from "react-native";
import Svg, { Circle, Text, Rect } from "react-native-svg";

import situations from "../../data/situation";
import { RageContext } from "../../store/rage-context";

import { Color, FontFamily } from "../../constants/GlobalStyles";

const SituationChart = () => {
  const rageCtx = useContext(RageContext);

  // const totalDataCount = rageCtx.rageQuakes.length;
  const totalDataCount = Math.max(1, rageCtx.rageQuakes.length);

  const situationCounts = situations.reduce((counts, situationOption) => {
    const { situation } = situationOption;
    const count = rageCtx.rageQuakes.filter(
      (item) => item.situation === situation
    ).length;
    counts[situation] = count;
    return counts;
  }, {});

  const situationData = Object.entries(situationCounts).map(
    ([situation, count]) => ({
      situation,
      count,
    })
  );

  situationData.sort((a, b) => b.count - a.count);

  console.log("situationData:", situationData);

  const windowDimensions = useWindowDimensions();
  const centerX = (windowDimensions.width / 2) - 20
  const centerY = windowDimensions.height / 4;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.primary600,
        borderRadius: 50,
        margin: 20,
      }}
    >
      <Svg width={windowDimensions.width} height={windowDimensions.height*0.5}>
        {situationData.map((item, index) => {
          const percentage = (item.count / totalDataCount) * 100;
          const strokeWidth = (percentage / 100) * 30; // Adjust the multiplier for desired thickness

          return (
            <Fragment key={index}>
              <Circle
                cx={centerX}
                cy={centerY}
                r={index * 15}
                fill="none"
                strokeWidth={strokeWidth}
                stroke={Color.primary200_80}
              />
            </Fragment>
          );
        })}
        <Rect
          x={centerX}
          y={centerY}
          width="35%"
          height="150"
          fill={Color.primary600_50}
        />
        {situationData.map((item, index) => {
          const percentage = (item.count / totalDataCount) * 100;

          return (
            <Fragment key={index}>
              <Text
                y={centerY + 20 + index * 15}
                x={centerX + 5}
                fontSize="12"
                fill={Color.primary200}
                textAnchor="left"
                fontStyle="italic"
              >
                {item.situation} {}
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
