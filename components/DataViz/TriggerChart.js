import React, { Fragment } from "react";
import { View, useWindowDimensions  } from "react-native";
import Svg, { Circle, Text, Rect } from "react-native-svg";

import data from "../../data/data";
import triggers from "../../data/trigger";

import { Color } from "../../constants/GlobalStyles";

const TriggerChart = () => {
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
  const centerY = windowDimensions.height / 4

  return (
    <View style={{ flex: 1, backgroundColor:Color.primary600 }}>
      <Svg width="100%" height="100%">
        {triggerData.map((item, index) => (
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
              strokeWidth={item.count * 3}
              stroke={Color.primary200_80}
            />
            <Text
              y={centerY + 15 + index * 15}
              x={centerX}
              fontSize="12"
              fill={Color.primary200}
              textAnchor="left"
            >
              {item.trigger}
            </Text>
          </Fragment>
        ))}
      </Svg>
    </View>
  );
};

export default TriggerChart;
