import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ReviewCard = ({ review }) => (
  <View className="bg-gray-800 rounded-2xl p-4 mb-3">
    {/* Header */}
    <View className="flex-row items-center mb-3">
      <Image 
        source={{ uri: review.avatar }} 
        className="w-10 h-10 rounded-full mr-3"
      />
      <View className="flex-1">
        <Text className="text-white font-semibold">{review.name}</Text>
        <Text className="text-gray-400 text-xs">{review.date}</Text>
      </View>
      <View className="flex-row">
        {[...Array(5)].map((_, i) => (
          <Feather
            key={i}
            name="star"
            size={14}
            color="#FCD34D"
            fill={i < review.rating ? "#FCD34D" : "none"}
          />
        ))}
      </View>
    </View>

    {/* Review Text */}
    <Text className="text-gray-300 text-sm leading-5">{review.text}</Text>
  </View>
);

const TravelerReviews = () => {
  console.log('💬 Rendering TravelerReviews');

  const reviews = [
    {
      id: 1,
      name: "Sophia Bennett",
      date: "2 weeks ago",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=1",
      text: "The Maldives package was an absolute dream! The resort was breathtaking, and the service was impeccable. Every detail was perfect. Highly recommend!"
    },
    {
      id: 2,
      name: "Ethan Carter",
      date: "1 month ago",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=12",
      text: "The Alpine Retreat was fantastic. The skiing was world-class, and the cozy chalet was luxurious. The only downside was the cost of dining at the resort, but worth the experience."
    }
  ];

  return (
    <View className="mb-6">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 mb-4">
        <Text className="text-white text-xl font-bold">Traveler Reviews</Text>
        <View className="flex-row space-x-2">
          <TouchableOpacity 
            className="bg-blue-500 px-4 py-2 rounded-full"
            onPress={() => console.log('📝 Reviews filter pressed')}
          >
            <Text className="text-white text-xs font-semibold">Reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="bg-gray-700 px-4 py-2 rounded-full"
            onPress={() => console.log('⭐ Highest Rated filter pressed')}
          >
            <Text className="text-white text-xs">Highest Rated</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Reviews List */}
      <View className="px-4">
        {reviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </View>

      {/* Chat Button */}
      <View className="px-4 mt-4">
        <TouchableOpacity
          className="bg-blue-500 rounded-full py-4 flex-row items-center justify-center"
          onPress={() => console.log('💬 Chat with support pressed')}
          activeOpacity={0.9}
        >
          <Feather name="message-circle" size={20} color="white" />
          <Text className="text-white font-semibold ml-2">Chat with our support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TravelerReviews;