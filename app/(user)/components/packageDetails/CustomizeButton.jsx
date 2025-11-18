import { TouchableOpacity, Text } from 'react-native';

const CustomizeButton = ({ onPress }) => {
  console.log('🎨 Rendering CustomizeButton');

  return (
    <TouchableOpacity
      onPress={() => {
        console.log('🎨 Customize Package button pressed');
        onPress();
      }}
      className="bg-blue-500 rounded-full py-4 mx-4 items-center"
      activeOpacity={0.9}
    >
      <Text className="text-white font-bold text-base">Customize Package</Text>
    </TouchableOpacity>
  );
};

export default CustomizeButton;