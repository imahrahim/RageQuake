import React, { Fragment, useContext } from "react";
import { View, useWindowDimensions } from "react-native";
import Svg, { Circle, Text, Rect } from "react-native-svg";

import triggers from "../../data/trigger";
import { RageContext } from "../../store/rage-context";

import { Color, FontFamily } from "../../constants/GlobalStyles";

const TriggerChart = () => {
  const rageCtx = useContext(RageContext);

  // const totalDataCount = rageCtx.rageQuakes.length;
  const totalDataCount = Math.max(1, rageCtx.rageQuakes.length);

  const triggerCounts = triggers.reduce((counts, triggerOption) => {
    const { trigger } = triggerOption;
    const count = rageCtx.rageQuakes.filter(
      (item) => item.trigger === trigger
    ).length;
    counts[trigger] = count;
    return counts;
  }, {});

  const triggerData = Object.entries(triggerCounts).map(([trigger, count]) => ({
    trigger,
    count,
  }));

  triggerData.sort((a, b) => b.count - a.count);



  const windowDimensions = useWindowDimensions();
  const centerX = (windowDimensions.width / 2) -20
  const centerY = windowDimensions.height / 4;
  const rStep = 12;

  return (
    
    <View
      style={{
        flex: 1,
        backgroundColor: Color.primary200,
        borderRadius: 15,
        margin: 20,
      }}
    >
      <Svg
        width={windowDimensions.width}
        height={windowDimensions.height * 0.5}
      >
        {triggerData.map((item, index) => {
          const percentage = (item.count / totalDataCount) * 100;
          const strokeWidth = (rStep/100*percentage ) ;

          return (
            <Fragment key={index}>
              <Circle
              class="epi"
                cx={centerX}
                cy={centerY}
                r={(1+index) * rStep}
                fill="none"
                strokeWidth={strokeWidth}
                stroke={Color.primary600}
              />
            </Fragment>
          );
        })}
        <Rect
          x={centerX}
          y={centerY}
          width="35%"
          height="150"
          fill={Color.primary200_80}
        />
         {triggerData.map((item, index) => {
             const percentage = (item.count / totalDataCount) * 100;
             return (
             <Fragment key={index}>
          <Text
                y={centerY + 15 + index * rStep}
                x={centerX + 5}
                fontSize="12"
                fill={Color.primary600}
                textAnchor="left"
                fontStyle="italic"
                fontFamily={FontFamily.black}
              >
                {item.trigger} {}
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
