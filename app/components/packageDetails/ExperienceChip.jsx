import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ExperienceChip = ({ label, icon, onPress }) => (
  <TouchableOpacity
    onPress={() => {
      console.log('✨ Experience chip pressed:', label);
      onPress();
    }}
    className="bg-blue-500 px-5 py-3 rounded-full mr-3 flex-row items-center"
    activeOpacity={0.9}
  >
    <Feather name={icon} size={16} color="white" />
    <Text className="text-white text-sm font-medium ml-2">{label}</Text>
  </TouchableOpacity>
);

const ExperienceChips = ({ experiences = [] }) => {
  console.log('✨ Rendering ExperienceChips');

  return (
    <View className="py-4 px-4">
      <Text className="text-white text-lg font-bold mb-3">Enhance Your Experience</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row"
      >
        {experiences.map((exp) => (
          <ExperienceChip
            key={exp.id}
            label={exp.name}
            icon={exp.icon}
            onPress={() => console.log('Selected experience:', exp.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ExperienceChips;