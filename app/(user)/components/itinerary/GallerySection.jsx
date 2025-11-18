import { View, Text, Image, TouchableOpacity } from 'react-native';

const GallerySection = ({ images = [] }) => {
  console.log('🖼️ Rendering GallerySection');

  if (!images || images.length === 0) return null;

  return (
    <View className="px-4 py-6">
      <Text className="text-white text-2xl font-bold mb-4">Gallery</Text>
      
      <View className="flex-row flex-wrap -mx-1">
        {images.map((img, index) => (
          <TouchableOpacity
            key={img.id}
            onPress={() => console.log('🖼️ Image pressed:', img.id)}
            className="w-1/2 p-1"
            activeOpacity={0.9}
          >
            <Image
              source={{ uri: img.image }}
              className="w-full h-40 rounded-2xl"
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default GallerySection;