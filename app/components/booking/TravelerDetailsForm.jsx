import { View, Text, TextInput } from 'react-native';

const TravelerDetailsForm = ({ travelerDetails, onUpdate }) => {
  console.log('📝 Rendering TravelerDetailsForm');

  return (
    <View className="px-4 py-6">
      <Text className="text-white text-2xl font-bold mb-6">Traveler Details</Text>

      {/* Full Name */}
      <View className="mb-4">
        <Text className="text-white text-sm mb-2">Full Name</Text>
        <TextInput
          value={travelerDetails.fullName}
          onChangeText={(text) => {
            console.log('📝 Full name updated:', text);
            onUpdate({ fullName: text });
          }}
          placeholder="Enter your full name"
          placeholderTextColor="#9CA3AF"
          className="bg-white rounded-xl px-4 py-4 text-gray-900"
        />
      </View>

      {/* Email */}
      <View className="mb-4">
        <Text className="text-white text-sm mb-2">Email</Text>
        <TextInput
          value={travelerDetails.email}
          onChangeText={(text) => {
            console.log('📧 Email updated:', text);
            onUpdate({ email: text });
          }}
          placeholder="Enter your email"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          className="bg-white rounded-xl px-4 py-4 text-gray-900"
        />
      </View>

      {/* Phone Number */}
      <View className="mb-4">
        <Text className="text-white text-sm mb-2">Phone Number</Text>
        <TextInput
          value={travelerDetails.phoneNumber}
          onChangeText={(text) => {
            console.log('📱 Phone updated:', text);
            onUpdate({ phoneNumber: text });
          }}
          placeholder="Enter your phone number"
          placeholderTextColor="#9CA3AF"
          keyboardType="phone-pad"
          className="bg-white rounded-xl px-4 py-4 text-gray-900"
        />
      </View>
    </View>
  );
};

export default TravelerDetailsForm;