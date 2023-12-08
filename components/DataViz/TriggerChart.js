import React, { Fragment } from "react";
import { View, useWindowDimensions } from "react-native";
import Svg, { Circle, Text, Rect } from "react-native-svg";

import data from "../../data/data";
import triggers from "../../data/trigger";

import { Color, FontFamily } from "../../constants/GlobalStyles";

const TriggerChart = () => {
  const totalDataCount = data.length;

  const triggerCounts = triggers.reduce((counts, triggerOption) => {
    const { trigger } = triggerOption;
    const count = data.filter((item) => item.trigger === trigger).length;
    counts[trigger] = count;
    return counts;
  }, {});

  const triggerData = Object.entries(triggerCounts).map(([trigger, count]) => ({
    trigger,
    count,
  }));

  triggerData.sort((a, b) => b.count - a.count);

  console.log("trigger Data:", triggerData);

  const windowDimensions = useWindowDimensions();
  const centerX = windowDimensions.width / 2;
  const centerY = windowDimensions.height / 3;

  return (
    <View style={{ flex: 1, backgroundColor: Color.primary600 }}>
      <Svg width={windowDimensions.width} height={windowDimensions.height}>
        {triggerData.map((item, index) => {
          const percentage = (item.count / totalDataCount) * 100;
          const strokeWidth = (percentage / 100) * 50;

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
              <Rect
                x={centerX}
                y={centerY + 15 + index * 15}
                width="100%"
                height="15"
                fill={Color.primary600}
              />
              <Text
                y={centerY + 20 + index * 15}
                x={centerX}
                fontSize="12"
                fill={Color.primary200}
                textAnchor="left"
                fontStyle='italic'
              >
                {item.trigger} { }
                {percentage.toFixed(0)}%
              </Text>
            </Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

export default TriggerChart;
