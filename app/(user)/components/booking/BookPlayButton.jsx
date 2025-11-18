import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

const BookPayButton = ({ onPress, loading = false, disabled = false }) => {
  console.log('💰 Rendering BookPayButton');

  return (
    <TouchableOpacity
      onPress={() => {
        console.log('💳 Book & Pay Now pressed');
        onPress();
      }}
      disabled={disabled || loading}
      className={`mx-4 mb-6 rounded-full py-4 items-center ${
        disabled ? 'bg-gray-600' : 'bg-yellow-500'
      }`}
      activeOpacity={0.9}
    >
      {loading ? (
        <ActivityIndicator color="#111827" />
      ) : (
        <Text className="text-gray-900 font-bold text-base">Book & Pay Now</Text>
      )}
    </TouchableOpacity>
  );
};

export default BookPayButton;