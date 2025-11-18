import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const PaymentOption = ({ method, isSelected, onSelect, showButton = false }) => (
  <TouchableOpacity
    onPress={() => {
      console.log('💳 Payment method selected:', method.type);
      onSelect(method);
    }}
    className="flex-row items-center justify-between bg-gray-800 rounded-xl p-4 mb-3"
    activeOpacity={0.9}
  >
    <View className="flex-row items-center flex-1">
      <View className={`w-6 h-6 rounded border-2 mr-3 items-center justify-center ${
        isSelected ? 'border-yellow-400 bg-yellow-400' : 'border-gray-600'
      }`}>
        {isSelected && <Feather name="check" size={14} color="#111827" />}
      </View>
      <View className="flex-1">
        <Text className="text-white font-semibold">
          {method.type} {method.last4 ? `...${method.last4}` : ''}
        </Text>
      </View>
    </View>

    {showButton && (
      <View className="bg-yellow-500 px-4 py-2 rounded-full">
        <Text className="text-gray-900 text-xs font-bold">
          {isSelected ? 'Button' : 'Select'}
        </Text>
      </View>
    )}
  </TouchableOpacity>
);

const PaymentMethodSelector = ({ methods = [], selected, onSelect }) => {
  console.log('💳 Rendering PaymentMethodSelector');

  return (
    <View className="px-4 py-6">
      <Text className="text-white text-2xl font-bold mb-4">Payment Method</Text>

      {methods.map((method, index) => (
        <PaymentOption
          key={method.id}
          method={method}
          isSelected={selected?.id === method.id}
          onSelect={onSelect}
          showButton={index < 2}
        />
      ))}
    </View>
  );
};

export default PaymentMethodSelector;