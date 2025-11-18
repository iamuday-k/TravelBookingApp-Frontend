import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { icons } from "../../../constants";

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = String(title || "").toLowerCase().includes("password");

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-white-100 font-pmedium">{title}</Text>

      <View className="w-full rounded-3xl h-16 px-4 bg-primary items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          onChangeText={handleChangeText}
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword((s) => !s)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityLabel={showPassword ? "Hide password" : "Show password"}
            className="ml-2"
          >
            <Image
              source={!showPassword ? icons.eyeopen : icons.eyeclose}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
