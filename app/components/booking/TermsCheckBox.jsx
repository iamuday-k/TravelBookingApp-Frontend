import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const TermsCheckbox = ({ agreed, onToggle }) => {
  console.log('📋 Rendering TermsCheckbox - Agreed:', agreed);

  return (
    <TouchableOpacity
      onPress={() => {
        console.log('📋 Terms toggled');
        onToggle();
      }}
      className="flex-row items-center px-4 py-4"
      activeOpacity={0.7}
    >
      <View className={`w-6 h-6 rounded border-2 mr-3 items-center justify-center ${
        agreed ? 'border-yellow-400 bg-yellow-400' : 'border-gray-600'
      }`}>
        {agreed && <Feather name="check" size={14} color="#111827" />}
      </View>
      <Text className="text-white text-sm flex-1">
        I agree to the terms and conditions
      </Text>
    </TouchableOpacity>
  );
};

export default TermsCheckbox;