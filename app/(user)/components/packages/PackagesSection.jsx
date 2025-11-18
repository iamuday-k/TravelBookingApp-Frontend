import { View, Text } from 'react-native';
import PackageCard from './PackageCard';

const PackagesSection = ({ title, packages, onPackagePress }) => {
  console.log(`📑 Rendering PackagesSection: ${title} (${packages.length} items)`);

  if (!packages || packages.length === 0) {
    return null;
  }

  return (
    <View className="mb-6">
      <Text className="text-white text-xl font-bold mb-4 px-4">{title}</Text>
      <View className="px-4">
        {packages.map((pkg) => (
          <PackageCard 
            key={pkg.packageId} 
            item={pkg} 
            onPress={onPackagePress}
          />
        ))}
      </View>
    </View>
  );
};

export default PackagesSection;