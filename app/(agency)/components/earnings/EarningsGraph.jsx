import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Svg, { Path, Line, Text as SvgText } from 'react-native-svg';

const EarningsGraph = ({ data }) => {
  const screenWidth = Dimensions.get('window').width;
  const graphWidth = screenWidth - 60;
  const graphHeight = 200;
  const padding = 10;

  if (!data || data.length === 0) {
    return null;
  }

  const maxValue = Math.max(...data.map(d => d.value));
  const yAxisLabels = [50000, 30000, 10000, 0];

  // Calculate points for the path
  const points = data.map((item, index) => {
    const x = padding + (index * (graphWidth - 2 * padding)) / (data.length - 1);
    const y = graphHeight - padding - ((item.value / maxValue) * (graphHeight - 2 * padding));
    return { x, y, value: item.value };
  });

  // Create smooth path
  const createPath = () => {
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const xMid = (points[i].x + points[i + 1].x) / 2;
      const yMid = (points[i].y + points[i + 1].y) / 2;
      const cpX1 = (xMid + points[i].x) / 2;
      const cpY1 = points[i].y;
      const cpX2 = (xMid + points[i + 1].x) / 2;
      const cpY2 = points[i + 1].y;
      
      path += ` Q ${cpX1} ${cpY1}, ${xMid} ${yMid}`;
      path += ` Q ${cpX2} ${cpY2}, ${points[i + 1].x} ${points[i + 1].y}`;
    }
    
    return path;
  };

  // Create gradient fill path
  const createGradientPath = () => {
    let path = createPath();
    path += ` L ${points[points.length - 1].x} ${graphHeight - padding}`;
    path += ` L ${points[0].x} ${graphHeight - padding}`;
    path += ' Z';
    return path;
  };

  return (
    <View className="mb-6">
      <View className="relative">
        <Svg height={graphHeight} width={graphWidth}>
          {/* Y-axis grid lines */}
          {yAxisLabels.map((label, index) => {
            const y = padding + (index * (graphHeight - 2 * padding)) / (yAxisLabels.length - 1);
            return (
              <Line
                key={`grid-${index}`}
                x1={padding}
                y1={y}
                x2={graphWidth - padding}
                y2={y}
                stroke="#374151"
                strokeWidth="1"
              />
            );
          })}

          {/* Gradient fill */}
          <Path
            d={createGradientPath()}
            fill="url(#gradient)"
            opacity="0.3"
          />

          {/* Main line */}
          <Path
            d={createPath()}
            stroke="#8B5CF6"
            strokeWidth="3"
            fill="none"
          />
        </Svg>

        {/* Y-axis labels */}
        <View className="absolute right-2 top-0 h-full justify-between py-2">
          {yAxisLabels.map((label, index) => (
            <Text key={`label-${index}`} className="text-yellow-500 text-xs">
              ₹ {label >= 1000 ? `${label / 1000}K` : label}
            </Text>
          ))}
        </View>
      </View>

      {/* X-axis label */}
      <Text className="text-gray-400 text-xs mt-2">{data[0]?.month || 'April 2025'}</Text>
    </View>
  );
};

export default EarningsGraph;