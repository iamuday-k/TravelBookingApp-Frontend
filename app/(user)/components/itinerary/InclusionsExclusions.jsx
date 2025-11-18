import { View, Text } from 'react-native';

const InclusionItem = ({ category, items, included }) => (
  <View className="mb-4">
    <Text className={`text-sm font-semibold mb-1 ${included ? 'text-yellow-400' : 'text-gray-400'}`}>
      {category}
    </Text>
    {items.map((item, index) => (
      <Text key={index} className={`text-xs ${included ? 'text-gray-300' : 'text-gray-500'}`}>
        {item.name}
      </Text>
    ))}
  </View>
);

const InclusionsExclusions = ({ inclusions = [] }) => {
  console.log('✅ Rendering InclusionsExclusions');

  const included = inclusions.filter(inc => inc.items.some(i => i.included));
  const excluded = inclusions.filter(inc => inc.items.some(i => !i.included));

  return (
    <View className="px-4 py-6">
      <Text className="text-white text-2xl font-bold mb-4">Inclusions | Exclusions</Text>
      
      <View className="border-t border-gray-700 pt-4">
        <View className="flex-row">
          {/* Included Column */}
          <View className="flex-1 pr-4">
            {included.map((inc, index) => (
              <InclusionItem
                key={index}
                category={inc.category}
                items={inc.items}
                included={true}
              />
            ))}
          </View>

          {/* Excluded Column */}
          <View className="flex-1 pl-4">
            {excluded.map((exc, index) => (
              <InclusionItem
                key={index}
                category={exc.category}
                items={exc.items}
                included={false}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default InclusionsExclusions;